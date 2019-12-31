import { Component, Input, OnInit } from '@angular/core';
import { Posts } from '../Posts.model';
import { PostsService } from '../Posts.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostComponent implements OnInit {

  // postList = [
  //   {title: 'First Title', content: 'First Content'},
  //   {title: 'Second Title', content: 'Second Content'},
  //   {title: 'Third Title', content: 'Third Content'}
  // ];

//  @Input() postList: Posts[] = [];

postList: Posts[] = [];

constructor(public postService: PostsService) {}

ngOnInit() {
  this.postList = this.postService.getPosts();
}

}
