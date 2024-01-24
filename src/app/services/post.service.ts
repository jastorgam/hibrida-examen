import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { PostData } from '../models/post-data';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor() {}

  async getPosts(): Promise<PostData[]> {
    let posts: string | null = (await Preferences.get({ key: 'data' })).value;
    return JSON.parse(posts ?? '[]');
  }

  async deletePost(post: PostData) {
    let posts = await this.getPosts();
    posts = this.deletePlacePrivate(posts, post).updatedPlaces;
    this.savePosts(posts);
  }

  private async savePosts(posts: PostData[]) {
    await Preferences.set({ key: 'data', value: JSON.stringify(posts) });
  }

  async savePost(post: PostData) {
    let posts = await this.getPosts();
    posts.push(post);
    await Preferences.set({ key: 'data', value: JSON.stringify(posts) });
  }

  /**
   * Para borrar y devolver la posicion borrada
   * en caso de insetar un nuevo elemento en esa posicion.
   * Codigo reutilizado de las pruebas anteriores.
   */
  private deletePlacePrivate(
    posts: PostData[],
    post: PostData
  ): { updatedPlaces: PostData[]; idxRemove: number } {
    const idxRemove = posts.findIndex((i) => i.id == post.id);
    if (idxRemove !== -1) posts.splice(idxRemove, 1);
    return { updatedPlaces: posts, idxRemove: idxRemove };
  }
}
