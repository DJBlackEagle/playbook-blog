import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { GetPostByIdGQL, UpdatePostInput } from '../../generated/graphql';
import { NotificationService } from '../../services/notification.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css', '../post-create/post-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly getPostByIdGQL = inject(GetPostByIdGQL);
  private readonly postService = inject(PostService);
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

  private readonly postResult = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) => {
        if (!id) throw new Error('Post ID is missing');
        return this.getPostByIdGQL.watch({ id }).valueChanges;
      }),
    ),
  );

  readonly post = computed(() => this.postResult()?.data?.post ?? null);
  readonly postId = computed(() => this.post()?.id);

  constructor() {
    // Effect to populate the form once the post data is loaded
    effect(() => {
      const currentPost = this.post();
      if (currentPost) {
        this.postForm.patchValue({
          title: currentPost.title,
          teaser: currentPost.teaser,
          content: currentPost.content,
          sources: currentPost.sources?.join(', ') || '',
        });
      }
    });
  }

  /**
   * Handles the form submission by calling the PostService to update the post.
   */
  async onSubmit(): Promise<void> {
    this.postForm.markAllAsTouched();
    if (this.postForm.invalid || !this.postId()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    const formValue = this.postForm.getRawValue();
    const updateInput: UpdatePostInput = {
      title: formValue.title,
      teaser: formValue.teaser,
      content: formValue.content,
      sources: formValue.sources
        ? formValue.sources
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean)
        : [],
    };

    try {
      await this.postService.updatePost(this.postId()!, updateInput);
      this.notificationService.show('Post updated successfully!');
      await this.router.navigate(['/posts', this.postId()]);
    } catch (error) {
      this.errorMessage.set('An error occurred while updating the post.');
      console.error('Update post failed:', error);
    } finally {
      this.loading.set(false);
    }
  }
}
