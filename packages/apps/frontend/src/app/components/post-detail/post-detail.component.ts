import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { GetPostByIdGQL } from '../../generated/graphql';
import { Nl2brPipe } from '../../pipes/nl2br.pipe';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, Nl2brPipe],
  template: `
    <div class="post-detail-container">
      <a routerLink="/" class="back-link">← Back to all posts</a>

      @if (status() === 'loading') {
        <p>Loading post...</p>
      }

      @if (status() === 'error') {
        <p class="error">Could not load the post. Please try again later.</p>
      }

      @if (post(); as p) {
        <article>
          <h1>{{ p.title }}</h1>
          <p class="post-meta">Published on {{ p.createdAt | date: 'longDate' }}</p>

          <section class="teaser-section">
            <p>
              <em>{{ p.teaser }}</em>
            </p>
          </section>

          <hr />

          <section class="content-section">
            <p [innerHTML]="p.content | nl2br"></p>
          </section>
        </article>
      }
    </div>
  `,
  styles: `
    .post-detail-container {
      width: 100%;
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .post-meta {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 2rem;
    }
    .teaser-section {
      background-color: #f9f9f9;
      border-left: 4px solid #007bff;
      padding: 1rem 1.5rem;
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }
    .content-section p {
      line-height: 1.6;
      font-size: 1.1rem;
    }
    .back-link {
      display: inline-block;
      margin-bottom: 2rem;
    }
    .error {
      color: red;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly getPostByIdGQL = inject(GetPostByIdGQL);

  // Erstellt ein Signal, das den Post aus der URL-ID abruft
  private readonly postResult = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id')!),
      switchMap((id) => this.getPostByIdGQL.watch({ id }).valueChanges),
    ),
  );

  // Abgeleitete Signale für eine saubere Template-Logik
  readonly post = computed(() => this.postResult()?.data?.post ?? null);
  readonly status = computed(() => {
    const res = this.postResult();
    if (res?.loading) return 'loading';
    if (res?.error) return 'error';
    return 'success';
  });
}
