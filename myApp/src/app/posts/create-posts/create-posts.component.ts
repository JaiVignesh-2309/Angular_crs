import { Component, EventEmitter, Output } from '@angular/core';

import { Posts } from '../Posts.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-posts',
  styleUrls: ['./create-posts.component.css'],
  templateUrl: './create-posts.component.html'
})
export class CreatePostsComponent {

  commentTite = '';
  commentContent = '';
  defaultPost = 'No Content';

  // Create an emitter using property name "postCreated"
  @Output() postCreated = new EventEmitter<Posts>();

  // For Inputing the value

  // onSavePost(EnteredPost: HTMLTextAreaElement) {
  //   // alert('hello');
  //   console.dir(EnteredPost);
  //   this.defaultPost = EnteredPost.value;
  // }

  // For ngModel

  // onSavePost() {
  //   this.defaultPost = this.EnteredValue;
  // }

  // Using 2 way binding using ngModel instead of forms

  // onSavePost() {
  //   const posts: Posts = { title: this.commentTite, content: this.commentContent };

  //   // Emit the desired value so that the value can be listened
  //   this.postCreated.emit(posts);
  // }

  // Using Forms and indicaor references

  onSavePost(post: NgForm) {

    if (post.invalid) {
      return;
    }

    const posts: Posts = { title: post.value.title, content: post.value.content };

    // Emit the desired value so that the value can be listened
    this.postCreated.emit(posts);
  }

}
