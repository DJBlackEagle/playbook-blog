import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppRoutes } from '../../app.routes';
import { Nl2brPipe } from '../../pipes/nl2br.pipe';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { AuthService } from '../../services/auth.service';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { NotificationService } from '../../services/notification.service';
import { Button } from '../../shared/components/button/button';
import { DeletePostGQL, GetPostByIdGQL } from './generated/graphql';

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule, Nl2brPipe, SafeHtmlPipe, Button],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss',
})
export class PostDetail {
  readonly R = AppRoutes;
  readonly componentTitle = this.R.POST_DETAIL.title;
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly getPostByIdGQL = inject(GetPostByIdGQL);
  private readonly deletePostGQL = inject(DeletePostGQL);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationDialogService = inject(ConfirmationDialogService);
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
    if (!this.authService.isAuthenticated()) {
      this.notificationService.show('You must be logged in to edit a post.', 'error');
      return;
    }

    const postId = this.post()?.id;
    if (!postId) {
      this.notificationService.show('Post ID is missing. Cannot edit post.', 'error');
      return;
    }

    this.router.navigate([this.R.POST_EDIT.path.replace(':id', postId)]);
  }

  protected async delete(): Promise<void> {
    if (!this.authService.isAuthenticated()) {
      this.notificationService.show('You must be logged in to delete a post.', 'error');
      return;
    }

    const postId = this.post()?.id;
    const postTitle = this.post()?.title;

    if (!postId) {
      this.notificationService.show('Post ID is missing. Cannot delete post.', 'error');
      return;
    }

    if (!postTitle) {
      this.notificationService.show('Post title is missing. Cannot delete post.', 'error');
      return;
    }

    const confirm = await this.confirmationDialogService.open(
      `Are you sure you want to delete the post titled "${postTitle}"? This action cannot be undone.`,
    );

    if (!confirm) {
      this.notificationService.show('Post deletion cancelled.');
      return;
    }

    try {
      const result = await firstValueFrom(
        this.deletePostGQL.mutate({
          variables: {
            id: postId,
          },
          update: (cache, { data }) => {
            const deletedPostId = data?.deleteOnePost?.id;
            if (deletedPostId) {
              const cacheId = cache.identify({ __typename: 'Post', id: deletedPostId });
              cache.evict({ id: cacheId });
              cache.gc();
            }
          },
        }),
      );

      if (!result?.data?.deleteOnePost?.id) {
        throw new Error('Delete post mutation did not return the deleted post ID.');
      }

      await this.router.navigate([this.R.POST_LIST.path]);
      this.notificationService.show('Post deleted successfully!');
    } catch (error: unknown) {
      this.notificationService.show('Failed to delete post. Please try again.', 'error');
      console.error('Post creation failed:', error);
    }
  }
}
