import { Injectable } from '@angular/core';
import { Post} from './post.model';
import { Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[]=[];
  private postsUpdated = new Subject<Post[]>();


  constructor(private http: HttpClient){}

  getPosts(){
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    //adding multiple operaters using pipe
    .pipe(map((postData =>{
        return postData.posts.map(post=>{
          return {
            tittle: post.tittle,
            content: post.content,
            id: post._id
          }
        });
    })))
    .subscribe((transformedPosts)=>{
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
    }

  getPostUpdateListener(){
  return this.postsUpdated.asObservable();
}
  addPost(tittle: string, content:string){
  const post: Post = {id: null, tittle:tittle, content: content};
  this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
  .subscribe((responseData)=>{
    console.log(responseData.message);
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  });

}
deletePost(postId: string){
  this.http.delete("http://localhost:3000/api/posts/"+ postId)
  .subscribe(()=>{
    const updatedPosts = this.posts.filter(post=> post.id !==postId);
    this.posts = updatedPosts;
    this.postsUpdated.next([...this.posts]);
  });
}
}