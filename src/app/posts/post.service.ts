import { Injectable } from '@angular/core';
import { Post} from './post.model';


@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[]=[];


getPosts(){
  return [...this.posts];
}

addPost(tittle: string, content:string){
  const post: Post = {tittle:tittle, content: content};
  this.posts.push(post);
}
}
