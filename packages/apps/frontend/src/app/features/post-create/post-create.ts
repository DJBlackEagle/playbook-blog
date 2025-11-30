/* eslint-disable @typescript-eslint/unbound-method */
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom, tap } from 'rxjs';
import { AppRoutes } from '../../app.routes';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { GetPostsGQL } from '../post-list/generated/graphql';
import { CreateOnePostGQL } from './generated/graphql';

interface PostForm {
  title: FormControl<string>;
  teaser: FormControl<string>;
  content: FormControl<string>;
}

@Component({
  selector: 'app-post-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-create.html',
  styleUrl: './post-create.scss',
})
export class PostCreate {
  private readonly R = AppRoutes;
  private readonly createPost = inject(CreateOnePostGQL);
  private readonly getPostsGQL = inject(GetPostsGQL);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  protected readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);

  protected readonly componentTitle = this.R.POST_CREATE.title;
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

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
    // For demo purposes, pre-fill the form with default credentials.
    const date = new Date();
    this.postForm.setValue({
      title: `My First Post ${date.toISOString()}`,
      teaser: 'This is a teaser.',
      content: 'Hello, world!',
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
    this.loading.set(true);
    this.errorMessage.set(null);
    try {
      const { title, teaser, content } = this.postForm.getRawValue();
      const result = await firstValueFrom(
        this.createPost
          .mutate({
            variables: {
              input: {
                post: {
                  title,
                  teaser,
                  content,
                  sources: [],
                },
              },
            },
            refetchQueries: [{ query: this.getPostsGQL.document }],
          })
          .pipe(
            tap((res) => {
              console.log('Post creation result:', res);
            }),
          ),
      );

      if (result?.data?.createOnePost?.id) {
        await this.router.navigate(['/post', result.data.createOnePost.id]);
        this.notificationService.show('Post created successfully!');
      }
    } catch (error: unknown) {
      this.errorMessage.set('Failed to create post. Please try again.');
      console.error('Post creation failed:', error);
    } finally {
      this.loading.set(false);
    }
  }

  protected isFieldInvalid(fieldName: keyof PostForm): boolean {
    const control = this.postForm.get(fieldName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
