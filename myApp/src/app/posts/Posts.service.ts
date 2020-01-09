import { Posts } from './Posts.model';
import { Injectable } from '@angular/core';
import { Subject, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient) {}

  private post: Posts[] = [];
  private postUpdatedList = new Subject<Posts[]>();

  getPosts() {
    // return [...this.post];

    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts/getPosts')
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

  getPostById(postId: string) {
    //  Directly using a copy not from server but on refresh the data gets erased
    // return {...this.post.find(p => p.id === postId)};

    // Fetch from server
    return this.http.get<{message: string, post: {_id: string, title: string, content: string}}>
    ('http://localhost:3000/api/posts/getPostById/' + postId);

  }

  addPosts(Ltitle: string, Lcontent: string) {

    const postData: Posts = {id: null, title: Ltitle, content: Lcontent};

    this.http.post<{message: string, id: string}>('http://localhost:3000/api/posts/addPosts', postData)
    .subscribe((data) => {

      console.log(data);
      postData.id = data.id;
      this.post.push(postData);
      this.postUpdatedList.next([...this.post]);

    });

  }

  updatePosts(Pid: string, Ptitle: string, Pcontent: string) {
    const updatePost = {
      id: Pid,
      title: Ptitle,
      content: Pcontent
    };
    this.http.put('http://localhost:3000/api/posts/updatePosts/' + Pid, updatePost)
    .subscribe((data) => {
      // console.log(this.post);

      // Update method 1
      // const oldPost = [...this.post];

      // this.post = oldPost.map( p => {
      //   if (p.id === Pid) {
      //     return { id: Pid, title: Ptitle, content: Pcontent };
      //   } else {
      //     return p;
      //   }
      // });
      // this.postUpdatedList.next([...this.post]);


      // Update Method 2

      const oldPosts = [...this.post];
      const oldPostIndex = oldPosts.findIndex( p => p.id === Pid );
      oldPosts[oldPostIndex] = updatePost;
      this.post = oldPosts;
      this.postUpdatedList.next([...this.post]);

    });
  }

  deletePost(id: string) {
    this.http.delete<{message: string}>('http://localhost:3000/api/posts/deletePost/' + id)
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
