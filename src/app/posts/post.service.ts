import { Injectable } from '@angular/core';
import { Post} from './post.model';
import { Subject} from 'rxjs';


@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[]=[];
  private postsUpdated = new Subject<Post[]>();


getPosts(){
  return [...this.posts];
}

getPostUpdateListener(){
  return this.postsUpdated.asObservable();
}
addPost(tittle: string, content:string){
  const post: Post = {tittle:tittle, content: content};
  this.posts.push(post);
  this.postsUpdated.next([...this.posts]);
}
}
