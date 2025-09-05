import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { GetPostByIdGQL } from '../../generated/graphql';
import { Nl2brPipe } from '../../pipes/nl2br.pipe';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, Nl2brPipe, SafeHtmlPipe],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly getPostByIdGQL = inject(GetPostByIdGQL);

  private readonly postResult = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) => {
        if (!id) throw new Error('Post ID is missing in route parameters');
        return this.getPostByIdGQL.watch({ id }).valueChanges;
      }),
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
