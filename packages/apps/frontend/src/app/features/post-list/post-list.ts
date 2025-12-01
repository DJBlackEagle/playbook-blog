import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AppRoutes } from '../../app.routes';
import { AuthService } from '../../services/auth.service';
import { Button } from '../../shared/components/button/button';
import {
  GetPostsGQL,
  GetPostsQueryVariables,
  PageInfo,
  Post,
  PostSortFields,
  SortDirection,
} from './generated/graphql';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, RouterLink, Button],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList implements OnInit {
  readonly R = AppRoutes;
  readonly componentTitle = this.R.POST_LIST.title;
  private readonly getPostsGQL = inject(GetPostsGQL);
  protected readonly authService = inject(AuthService);

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

  constructor() {}

  ngOnInit(): void {
    void this.fetchPosts({
      first: this.postsPerPage,
      sorting: [this.sort()],
    });
  }

  private async fetchPosts(variables: GetPostsQueryVariables): Promise<void> {
    this.loading.set(true);
    try {
      const result = await firstValueFrom(this.getPostsGQL.fetch({ variables }));
      if (result.data?.posts) {
        this.posts.set(result.data.posts.edges.map((edge) => edge.node));
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

  async nextPage(): Promise<void> {
    const pi: PageInfo | null = this.pageInfo();
    if (this.loading() || !pi?.hasNextPage || typeof pi.endCursor !== 'string') return;

    this.currentPage.update((p) => p + 1);
    await this.fetchPosts({
      first: this.postsPerPage,
      after: pi.endCursor,
      sorting: [this.sort()],
    });

    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  }

  async previousPage(): Promise<void> {
    const pi: PageInfo | null = this.pageInfo();
    if (this.loading() || !pi?.hasPreviousPage || typeof pi.startCursor !== 'string') return;

    this.currentPage.update((p) => p - 1);
    await this.fetchPosts({
      last: this.postsPerPage,
      before: pi.startCursor,
      sorting: [this.sort()],
    });

    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  }
}
