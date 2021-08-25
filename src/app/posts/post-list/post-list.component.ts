import { Component, Input } from "@angular/core";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  // posts = [
  //   {title: 'First Post', content: 'This is first post'},
  //   {title: 'Second Post', content: 'This is second post'},
  //   {title: 'Third Post', content: 'This is third post'}
  // ];
  @Input() posts: Post[] = [];

  // Constructor
  // postsService: PostsService;
  // constructor(postsService: PostsService) {
  //   this.postsService = postsService;
  // }
  // Can be simplify :
  constructor(public postsService: PostsService) {}
}
