import { Injectable } from "@angular/core";
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts: Post[] = [];

  getPosts(){
    return [...this.posts]; // copy the array value, not the reference
  }

  addPost(title: string, content: string){
    const post: Post = {title: title, content: content};
    this.posts.push(post);
  }
}
