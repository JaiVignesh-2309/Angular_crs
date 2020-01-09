import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { Posts } from '../Posts.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../Posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-posts',
  styleUrls: ['./create-posts.component.css'],
  templateUrl: './create-posts.component.html'
})
export class CreatePostsComponent implements OnInit {

  commentTite = '';
  commentContent = '';
  defaultPost = 'No Content';
  private mode = 'create';
  private editPostId: string;
  post: Posts;

  // Create an emitter using property name "postCreated"
  // @Output() postCreated = new EventEmitter<Posts>();


  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {

    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.editPostId = paramMap.get('postId');
        //  Directly using a copy but on refresh the data gets erased
        // this.post = this.postsService.getPostById(this.editPostId);
        //  from server
        this.postsService.getPostById(this.editPostId).subscribe((postData) => {

          console.log(postData);
          this.post = { id: postData.post._id, title: postData.post.title, content: postData.post.content };
        });

      } else {
        this.mode = 'create';
        this.post = null;
      }
    } );

  }

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

  // onSavePost(post: NgForm) {

  //   if (post.invalid) {
  //     return;
  //   }

  //   const posts: Posts = { title: post.value.title, content: post.value.content };

  //   // Emit the desired value so that the value can be listened
  //   this.postCreated.emit(posts);
  // }


  // Using service

   onSavePost(post: NgForm) {

    if (post.invalid) {
      return;
    }

    // const posts: Posts = { title: post.value.title, content: post.value.content };

    if (this.mode === 'create') {

      this.postsService.addPosts(post.value.title, post.value.content);
    } else {

      this.postsService.updatePosts(this.editPostId, post.value.title, post.value.content);
    }
    post.resetForm();

  }

}
