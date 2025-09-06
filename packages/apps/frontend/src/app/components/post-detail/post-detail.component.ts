import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { hasPostBeenUpdated } from '../../../helper/post.helper';
import { GetPostByIdGQL, Post } from '../../generated/graphql';
import { Nl2brPipe } from '../../pipes/nl2br.pipe';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { AuthService } from '../../services/auth.service';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { NotificationService } from '../../services/notification.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule, RouterLink, Nl2brPipe, SafeHtmlPipe],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly getPostByIdGQL = inject(GetPostByIdGQL);
  private readonly postService = inject(PostService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationDialogService = inject(ConfirmationDialogService);
  private readonly router = inject(Router);
  protected readonly authService = inject(AuthService);

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

  /**
   * Handles the delete action for the current post.
   */
  async onDelete(): Promise<void> {
    const currentPost = this.post();
    if (!currentPost) return;

    const confirmed = await this.confirmationDialogService.open(
      `Are you sure you want to delete the post "${currentPost.title}"? This action cannot be undone.`,
    );

    if (confirmed) {
      try {
        await this.postService.deletePost(currentPost.id);
        await this.router.navigate(['/']);
        this.notificationService.show('Post deleted successfully!');
      } catch (error) {
        this.notificationService.show('Failed to delete the post.', 'error');
        console.error('Delete post failed:', error);
      }
    }
  }

  protected hasBeenUpdated(post: Partial<Post>): boolean {
    return hasPostBeenUpdated(post);
  }
}
