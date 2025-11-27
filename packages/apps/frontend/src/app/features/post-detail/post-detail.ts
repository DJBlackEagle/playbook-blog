import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AppRoutes } from '../../app.routes';
import { Nl2brPipe } from '../../pipes/nl2br.pipe';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { AuthService } from '../../services/auth.service';
import { Button } from '../../shared/components/button/button';
import { GetPostByIdGQL } from './generated/graphql';

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule, Nl2brPipe, SafeHtmlPipe, Button],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss',
})
export class PostDetail {
  readonly R = AppRoutes;
  readonly componentTitle = this.R.POSTLIST.title;
  private readonly route = inject(ActivatedRoute);
  private readonly getPostByIdGQL = inject(GetPostByIdGQL);
  private readonly router = inject(Router);
  protected readonly authService = inject(AuthService);

  private readonly postResult = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) => {
        if (!id) throw new Error('Post ID is missing in route parameters');
        return this.getPostByIdGQL.watch({ variables: { id } }).valueChanges;
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

  protected hasBeenUpdated(post: { createdAt?: Date; updatedAt?: Date }): boolean {
    if (!post.createdAt || !post.updatedAt) return false;

    return !!post.updatedAt && post.updatedAt !== post.createdAt;
  }

  protected edit(): void {
    alert('Edit post functionality is not implemented yet.');
  }

  protected delete(): void {
    alert('Delete post functionality is not implemented yet.');
  }
}
