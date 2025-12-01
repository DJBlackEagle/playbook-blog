/* eslint-disable @typescript-eslint/unbound-method */
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, switchMap, tap } from 'rxjs';
import { AppRoutes } from '../../app.routes';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { GetPostsGQL } from '../post-list/generated/graphql';
import { GetPostByIdGQL, UpdateOnePostGQL } from './generated/graphql';

interface PostForm {
  title: FormControl<string>;
  teaser: FormControl<string>;
  content: FormControl<string>;
}

@Component({
  selector: 'app-post-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-edit.html',
  styleUrl: './post-edit.scss',
})
export class PostEdit {
  private readonly R = AppRoutes;
  protected readonly componentTitle = this.R.POST_EDIT.title;
  private readonly getPostByIdGQL = inject(GetPostByIdGQL);
  private readonly getPostsGQL = inject(GetPostsGQL);
  private readonly updatePost = inject(UpdateOnePostGQL);

  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

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

  protected readonly postForm: FormGroup<PostForm> = this.formBuilder.group({
    title: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    teaser: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    content: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor() {
    effect(() => {
      const postData = this.post();
      if (postData) {
        this.postForm.patchValue({
          title: postData.title,
          teaser: postData.teaser,
          content: postData.content,
        });
      }
    });
  }

  /**
   * Handles the form submission by calling the AuthService.
   */
  async onSubmit(): Promise<void> {
    if (!this.authService.isAuthenticated()) {
      this.errorMessage.set('You must be logged in to create a post.');
      return;
    }

    this.postForm.markAllAsTouched();
    if (this.postForm.invalid) {
      return;
    }

    const postId = this.post()?.id;

    if (!postId) {
      this.notificationService.show('Post ID is missing. Cannot delete post.', 'error');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    try {
      const { title, teaser, content } = this.postForm.getRawValue();
      const result = await firstValueFrom(
        this.updatePost
          .mutate({
            variables: {
              input: {
                id: postId,
                update: {
                  title,
                  teaser,
                  content,
                },
              },
            },
            refetchQueries: [
              { query: this.getPostsGQL.document },
              { query: this.getPostByIdGQL.document, variables: { id: postId } },
            ],
          })
          .pipe(
            tap((res) => {
              console.log('Post creation result:', res);
            }),
          ),
      );

      if (result?.data?.updateOnePost?.id) {
        await this.router.navigate(['/post', result.data.updateOnePost.id]);
        this.notificationService.show('Post updated successfully!');
      }
    } catch (error: unknown) {
      this.errorMessage.set('Failed to update post. Please try again.');
      console.error('Post updating failed:', error);
    } finally {
      this.loading.set(false);
    }
  }

  protected isFieldInvalid(fieldName: keyof PostForm): boolean {
    const control = this.postForm.get(fieldName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
