import { Component, Input } from '@angular/core';
import { Posts } from '../Posts.model';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostComponent {

  // postList = [
  //   {title: 'First Title', content: 'First Content'},
  //   {title: 'Second Title', content: 'Second Content'},
  //   {title: 'Third Title', content: 'Third Content'}
  // ];

 @Input() postList: Posts[] = [];

}
