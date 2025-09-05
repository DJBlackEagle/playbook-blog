import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import {
  GetPostsGQL,
  GetPostsQuery,
  GetPostsQueryVariables,
  PageInfo,
  Post,
  PostSortFields,
  SortDirection,
} from '../../generated/graphql';
import { NavigationService } from '../../services/navigation.service';

type PostEdge = GetPostsQuery['posts']['edges'][0];

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit, OnDestroy {
  private homeClickedSubscription: Subscription | null = null;
  private readonly getPostsGQL = inject(GetPostsGQL);
  private readonly navigationService = inject(NavigationService);

  protected readonly posts = signal<Partial<Post>[]>([]);
  protected readonly pageInfo = signal<PageInfo | null>(null);
  protected readonly loading = signal(true);
  protected readonly currentPage = signal(1);
  private readonly sort = signal({
    field: PostSortFields.CreatedAt,
    direction: SortDirection.Desc,
  });
  private readonly totalPosts = signal(0);
  protected readonly totalPages = computed(() => Math.ceil(this.totalPosts() / this.postsPerPage));

  private readonly postsPerPage = 3;

  ngOnInit(): void {
    void this.fetchPosts({
      first: this.postsPerPage,
      sorting: [this.sort()],
    });

    this.homeClickedSubscription = this.navigationService.homeClicked$.subscribe(() => {
      if (this.currentPage() !== 1) {
        this.currentPage.set(1);
        void this.fetchPosts({
          first: this.postsPerPage,
          sorting: [this.sort()],
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.homeClickedSubscription?.unsubscribe();
  }

  private async fetchPosts(variables: GetPostsQueryVariables): Promise<void> {
    this.loading.set(true);
    try {
      const result = await firstValueFrom(
        this.getPostsGQL.fetch(variables, { fetchPolicy: 'network-only' }),
      );
      if (result.data?.posts) {
        this.posts.set(result.data.posts.edges.map((edge: PostEdge) => edge.node));
        this.pageInfo.set(result.data.posts.pageInfo);
        this.totalPosts.set(result.data.posts.totalCount);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      // Optional: Show error message in the UI
    } finally {
      this.loading.set(false);
    }
  }

  onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const [field, direction] = select.value.split('-') as [PostSortFields, SortDirection];

    this.sort.set({ field, direction });
    this.currentPage.set(1);

    void this.fetchPosts({
      first: this.postsPerPage,
      sorting: [this.sort()],
    });
  }

  nextPage(): void {
    const pi = this.pageInfo();
    if (this.loading() || !pi?.hasNextPage) return;

    this.currentPage.update((p) => p + 1);
    void this.fetchPosts({
      first: this.postsPerPage,
      after: pi.endCursor,
      sorting: [this.sort()],
    });
  }

  previousPage(): void {
    const pi = this.pageInfo();
    if (this.loading() || !pi?.hasPreviousPage) return;

    this.currentPage.update((p) => p - 1);
    void this.fetchPosts({
      last: this.postsPerPage,
      before: pi.startCursor,
      sorting: [this.sort()],
    });
  }
}
