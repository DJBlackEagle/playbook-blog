import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CreatePostGQL, CreatePostInput, Post } from '../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly createPostGQL = inject(CreatePostGQL);

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
}
