import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Posts } from '../Posts.model';
import { PostsService } from '../Posts.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostComponent implements OnInit, OnDestroy {

  // postList = [
  //   {title: 'First Title', content: 'First Content'},
  //   {title: 'Second Title', content: 'Second Content'},
  //   {title: 'Third Title', content: 'Third Content'}
  // ];

//  @Input() postList: Posts[] = [];

postList: Posts[] = [];


postUpdateSubs = new Subscription();

constructor(public postService: PostsService) {}

ngOnInit() {
  // this.postList = this.postService.getPosts();
  this.postService.getPosts();
  this.postUpdateSubs = this.postService.getPostUpdateListListener()
  .subscribe((posts: Posts[]) => {

    this.postList = posts;

  });
}

ngOnDestroy() {
  this.postUpdateSubs.unsubscribe();
}

onEdit() {}

onDelete(delId: string) {
this.postService.deletePost(delId);
// .subscribe((res) => {
//   console.log(res);
// });

}

}
