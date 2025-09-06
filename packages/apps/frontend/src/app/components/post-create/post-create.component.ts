import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreatePostInput } from '../../generated/graphql';
import { NotificationService } from '../../services/notification.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-create',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCreateComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly postService = inject(PostService);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly postForm: FormGroup<{
    title: FormControl<string>;
    teaser: FormControl<string>;
    content: FormControl<string>;
    sources: FormControl<string | null>;
  }> = this.formBuilder.group({
    title: this.formBuilder.control('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      nonNullable: true,
    }),
    teaser: this.formBuilder.control('', {
      validators: [Validators.required, Validators.minLength(10)],
      nonNullable: true,
    }),
    content: this.formBuilder.control('', {
      validators: [Validators.required, Validators.minLength(10)],
      nonNullable: true,
    }),
    sources: this.formBuilder.control(''),
  });

  /**
   * Handles the form submission by calling the PostService.
   */
  async onSubmit(): Promise<void> {
    this.postForm.markAllAsTouched();
    if (this.postForm.invalid) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    // Prepare the input for the mutation
    const formValue = this.postForm.getRawValue();
    const postInput: CreatePostInput = {
      title: formValue.title,
      teaser: formValue.teaser,
      content: formValue.content,
      // Split sources string into an array, trim whitespace, and filter out empty strings
      sources: this.processSources(formValue.sources),
    };

    try {
      const newPost = await this.postService.createPost(postInput);
      await this.router.navigate(['/posts', newPost.id]);
      this.notificationService.show('Post created successfully!');
    } catch (error) {
      this.errorMessage.set('An error occurred while creating the post. Please try again.');
      console.error('Create post failed:', error);
    } finally {
      this.loading.set(false);
    }
  }

  private processSources(sources: string | null): string[] {
    if (!sources) return [];

    return sources
      .split(',')
      .map((s: string) => s.trim())
      .filter(Boolean);
  }
}
