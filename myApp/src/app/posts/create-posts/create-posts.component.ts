import { Component, EventEmitter, Output } from '@angular/core';

import { Posts } from '../Posts.model';

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

  onSavePost() {
    const posts: Posts = { title: this.commentTite, content: this.commentContent };

    // Emit the desired value so that the value can be listened
    this.postCreated.emit(posts);
  }

}
