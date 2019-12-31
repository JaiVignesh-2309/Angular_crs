import { Posts } from './Posts.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PostsService {

  private post: Posts[] = [];

  getPosts() {
    return this.post;
  }

  addPosts(Ltitle: string, Lcontent: string) {
    const postData: Posts = {title: Ltitle, content: Lcontent};
    this.post.push(postData);
  }
}
