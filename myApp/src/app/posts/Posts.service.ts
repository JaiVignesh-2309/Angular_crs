import { Posts } from './Posts.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient) {}

  private post: Posts[] = [];
  private postUpdatedList = new Subject<Posts[]>();

  getPosts() {
    // return [...this.post];

    this.http.get<{message: string, posts: Posts[]}>('http://localhost:3000/api/getPosts')
    .subscribe( (postData) => {
      console.log(postData);
      this.post = postData.posts;
      this.postUpdatedList.next([...this.post]);
    });
  }

  getPostUpdateListListener() {
    return this.postUpdatedList.asObservable();
  }

  addPosts(Ltitle: string, Lcontent: string) {

    const postData: Posts = {pid: null, title: Ltitle, content: Lcontent};

    this.http.post<{message: string}>('http://localhost:3000/api/addPosts', postData)
    .subscribe((data) => {

      console.log(data.message);
      this.post.push(postData);
      this.postUpdatedList.next([...this.post]);

    });
    
  }
}
