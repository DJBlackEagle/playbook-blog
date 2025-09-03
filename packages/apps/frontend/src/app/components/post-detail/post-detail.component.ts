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

          <div class="teaser">
            <p>
              <em>{{ p.teaser }}</em>
            </p>
          </div>

          <p class="post-content" [innerHTML]="p.content | nl2br"></p>

          @if (p.sources && p.sources.length > 0) {
            <div class="sources-section">
              <h4>Sources</h4>
              <ul>
                @for (source of p.sources; track $index) {
                  <li>{{ source }}</li>
                }
              </ul>
            </div>
          }
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
    h1 {
      margin-bottom: 0.5rem;
    }
    .post-meta {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 2rem;
    }
    .teaser {
      background-color: #f0f8ff; /* Ein sehr helles Blau */
      border-left: 5px solid #007bff; /* Blauer Akzentstreifen */
      padding: 1.2rem 1.5rem;
      margin: 2rem 0; /* Mehr Abstand oben und unten */
      font-size: 1.15rem; /* Etwas größere Schrift */
      line-height: 1.6;
      font-style: italic; /* Kursiv wie gewünscht */
      color: #333; /* Dunklerer Text für bessere Lesbarkeit */
      border-radius: 4px; /* Leichte Rundung der Ecken */
    }
    .teaser p {
      /* Den Absatz im Teaser direkt ansprechen, um Standard-Margins zu entfernen */
      margin: 0;
    }
    .post-content {
      line-height: 1.7;
      font-size: 1.1rem;
      margin-top: 2rem; /* Abstand zum Teaser */
    }
    .sources-section {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid #eee;
    }
    .sources-section h4 {
      margin-bottom: 1rem;
    }
    .sources-section ul {
      list-style-position: inside;
      padding-left: 0;
    }
    .sources-section li {
      margin-bottom: 0.5rem;
      color: #555;
    }
    .back-link {
      display: inline-block;
      margin-bottom: 2rem;
      color: #007bff;
      text-decoration: none;
    }
    .back-link:hover {
      text-decoration: underline;
    }
    .error {
      color: red;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent {
  // Die Klassenlogik bleibt unverändert
  private readonly route = inject(ActivatedRoute);
  private readonly getPostByIdGQL = inject(GetPostByIdGQL);

  private readonly postResult = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id')!),
      switchMap((id) => this.getPostByIdGQL.watch({ id }).valueChanges),
    ),
  );

  readonly post = computed(() => this.postResult()?.data?.post ?? null);
  readonly status = computed(() => {
    const res = this.postResult();
    if (res?.loading) return 'loading';
    if (res?.error) return 'error';
    return 'success';
  });
}
