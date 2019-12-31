import { Posts } from './Posts.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {

  private post: Posts[] = [];
  private postUpdatedList = new Subject<Posts[]>();

  getPosts() {
    return [...this.post];
  }

  getPostUpdateListListener() {
    return this.postUpdatedList.asObservable();
  }

  addPosts(Ltitle: string, Lcontent: string) {
    const postData: Posts = {title: Ltitle, content: Lcontent};
    this.post.push(postData);
    this.postUpdatedList.next([...this.post]);
  }
}
