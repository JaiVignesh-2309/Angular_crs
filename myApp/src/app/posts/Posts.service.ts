import { Posts } from './Posts.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient) {}

  private post: Posts[] = [];
  private postUpdatedList = new Subject<Posts[]>();

  getPosts() {
    // return [...this.post];

    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/getPosts')
    .pipe(map((postData) => {
      return postData.posts.map((post) => {
        return {

          title: post.title,
          content: post.content,
          id: post._id

        };
      });
    }))
    .subscribe( (TransformedpostData) => {
      console.log(TransformedpostData);
      this.post = TransformedpostData;
      this.postUpdatedList.next([...this.post]);
    });
  }

  getPostUpdateListListener() {
    return this.postUpdatedList.asObservable();
  }

  addPosts(Ltitle: string, Lcontent: string) {

    const postData: Posts = {id: null, title: Ltitle, content: Lcontent};

    this.http.post<{message: string, id: string}>('http://localhost:3000/api/addPosts', postData)
    .subscribe((data) => {

      console.log(data);
      postData.id = data.id;
      this.post.push(postData);
      this.postUpdatedList.next([...this.post]);

    });

  }

  deletePost(id: string) {
    this.http.delete<{message: string}>('http://localhost:3000/api/deletePost/' + id)
    .subscribe((delData) => {
      // console.log(delData);
      console.log('Delete Success');
      const updatedPosts = this.post.filter( posts => posts.id !== id);
      this.post = updatedPosts;
      this.postUpdatedList.next([...this.post]);

      // return delData
    });
  }
}
