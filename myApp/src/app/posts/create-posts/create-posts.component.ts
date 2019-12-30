import { Component } from '@angular/core';

@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html'
})
export class CreatePostsComponent {

  EnteredValue = '';
  defaultPost = 'No Content';

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

}
