import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs'; // Wichtig für die neue Logik
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
  template: `
    <div class="post-container">
      <h2>Latest Posts</h2>

      <div class="sort-controls">
        <label for="sort-select">Sort by:</label>
        <select id="sort-select" (change)="onSortChange($event)">
          <option value="createdAt-DESC">Newest First</option>
          <option value="createdAt-ASC">Oldest First</option>
          <option value="title-ASC">Title (A-Z)</option>
          <option value="title-DESC">Title (Z-A)</option>
        </select>
      </div>

      @if (loading()) {
        <p>Loading posts...</p>
      }

      <ul class="post-list">
        @for (post of posts(); track post.id) {
          <a [routerLink]="['/posts', post.id]" class="post-link">
            <li class="post-item">
              <h3>{{ post.title }}</h3>
              <p class="teaser">
                <em>{{ post.teaser }}</em>
              </p>
              <small class="post-date">{{ post.createdAt | date: 'medium' }}</small>
            </li>
          </a>
        }
      </ul>

      <div class="pagination-controls">
        <button (click)="previousPage()" [disabled]="!pageInfo()?.hasPreviousPage || loading()">
          Previous
        </button>
        <span>Page {{ currentPage() }} / {{ totalPages() }}</span>
        <button (click)="nextPage()" [disabled]="!pageInfo()?.hasNextPage || loading()">
          Next
        </button>
      </div>
    </div>
  `,
  styles: `
    .post-container {
      width: 100%;
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .sort-controls {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .post-list {
      list-style: none;
      padding: 0;
      min-height: 500px;
    }
    .post-item {
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1rem;
    }
    .teaser {
      color: #333;
      margin-bottom: 1rem;
    }
    .post-date {
      color: #666;
      font-style: italic;
    }
    .post-link {
      text-decoration: none;
      color: inherit;
    }
    .post-item:hover {
      border-color: #007bff;
    }
    .pagination-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top: 2rem;
    }
    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
    }
    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
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
    // Initialer Ladevorgang
    void this.fetchPosts({
      first: this.postsPerPage,
      sorting: [this.sort()],
    });

    this.navigationService.homeClicked$.subscribe(() => {
      if (this.currentPage() !== 1) {
        this.currentPage.set(1);
        void this.fetchPosts({
          first: this.postsPerPage,
          sorting: [this.sort()],
        });
      }
    });
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
      // Optional: Fehlermeldung im UI anzeigen
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
