import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  CreatePostGQL,
  CreatePostInput,
  DeletePostGQL,
  Post,
  UpdatePostGQL,
  UpdatePostInput,
} from '../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly createPostGQL = inject(CreatePostGQL);
  private readonly updatePostGQL = inject(UpdatePostGQL);
  private readonly deletePostGQL = inject(DeletePostGQL);

  /**
   * Creates a new post by executing the CreatePost mutation.
   * @param postInput The data for the new post.
   * @returns A promise that resolves to the newly created post.
   */
  async createPost(postInput: CreatePostInput): Promise<Partial<Post>> {
    const result = await firstValueFrom(
      this.createPostGQL.mutate({
        input: { post: postInput },
      }),
    );
    if (!result.data?.createOnePost) {
      throw new Error('Failed to create post.');
    }
    return result.data.createOnePost;
  }

  /**
   * Updates an existing post.
   * @param id The ID of the post to update.
   * @param updateInput The data to update.
   * @returns A promise that resolves to the updated post.
   */
  async updatePost(id: string, updateInput: UpdatePostInput): Promise<Partial<Post>> {
    const result = await firstValueFrom(
      this.updatePostGQL.mutate({
        input: { id, update: updateInput },
      }),
    );
    if (!result.data?.updateOnePost) {
      throw new Error('Failed to update post.');
    }
    return result.data.updateOnePost;
  }

  /**
   * Deletes a post by its ID.
   * @param id The ID of the post to delete.
   * @returns A promise that resolves when the post is deleted.
   */
  async deletePost(id: string): Promise<void> {
    const result = await firstValueFrom(this.deletePostGQL.mutate({ id }));
    if (!result.data?.deleteOnePost) {
      throw new Error('Failed to delete post.');
    }
  }
}
