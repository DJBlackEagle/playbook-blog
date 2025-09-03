// Fügen Sie 'computed' zum Import hinzu
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
import { ApolloQueryResult } from '@apollo/client/core';
import { QueryRef } from 'apollo-angular';
import { GetPostsGQL, GetPostsQuery, PageInfo, Post } from '../../generated/graphql';

type PostEdge = GetPostsQuery['posts']['edges'][0];

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="post-container">
      <h2>Latest Posts</h2>

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
  // ... styles bleiben unverändert
  styles: `
    .post-container {
      width: 100%;
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
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
    .post-link {
      text-decoration: none;
      color: inherit;
    }
    .post-item:hover {
      border-color: #007bff;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  private readonly getPostsGQL = inject(GetPostsGQL);
  protected readonly posts = signal<Partial<Post>[]>([]);
  protected readonly pageInfo = signal<PageInfo | null>(null);
  protected readonly loading = signal(true);
  protected readonly currentPage = signal(1);

  // Signale für die Gesamtanzahl und die Berechnung der Seiten
  private readonly totalPosts = signal(0);
  protected readonly totalPages = computed(() => Math.ceil(this.totalPosts() / this.postsPerPage));

  private readonly postsPerPage = 3;
  private queryRef!: QueryRef<GetPostsQuery>;

  ngOnInit(): void {
    this.queryRef = this.getPostsGQL.watch({ first: this.postsPerPage });

    this.queryRef.valueChanges.subscribe((result: ApolloQueryResult<GetPostsQuery>) => {
      const { data, loading } = result;
      this.loading.set(loading);
      if (!loading && data?.posts) {
        this.posts.set(data.posts.edges.map((edge: PostEdge) => edge.node));
        this.pageInfo.set(data.posts.pageInfo);
        this.totalPosts.set(data.posts.totalCount); // Speichern der Gesamtanzahl
      }
    });
  }

  async nextPage(): Promise<void> {
    const pi = this.pageInfo();
    if (this.loading() || !this.queryRef || !pi?.hasNextPage) {
      return;
    }

    try {
      await this.queryRef.refetch({
        first: this.postsPerPage,
        after: pi.endCursor,
        last: undefined,
        before: undefined,
      });
      this.currentPage.update((p) => p + 1);
    } catch (error) {
      console.error('Failed to fetch next page:', error);
    }
  }

  async previousPage(): Promise<void> {
    const pi = this.pageInfo();
    if (this.loading() || !this.queryRef || !pi?.hasPreviousPage) {
      return;
    }

    try {
      await this.queryRef.refetch({
        last: this.postsPerPage,
        before: pi.startCursor,
        first: undefined,
        after: undefined,
      });
      this.currentPage.update((p) => p - 1);
    } catch (error) {
      console.error('Failed to fetch previous page:', error);
    }
  }
}
