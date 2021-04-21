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
            id: post._id,
            imagePath: post.imagePath
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

  getPost(id: string) {
    return this.http.get<{_id:string, tittle:string, content:string}>("http://localhost:3000/api/posts/"+ id);
  }


  addPost(tittle: string, content:string, image: File) {
      //json cannot add file so instead of sending json we send form data
      /* const post: Post = { id: null, tittle: tittle, content: content }; */
     const postData = new FormData();
     postData.append("tittle", tittle);
     postData.append("content", content);
     postData.append("image", image, tittle);
        this.http
       .post<{ message: string, post: Post }>("http://localhost:3000/api/posts", postData)
       .subscribe(responseData => {
     /*  console.log(responseData.message); */
        const post: Post = {
          id: responseData.post.id,
           tittle: tittle,
            content: content,
          imagePath: responseData.post.imagePath};

        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
  });
}

  updatePost(id:string, tittle:string, content:string) {
      const post: Post = { id:id, tittle:tittle, content: content, imagePath:null};
        this.http.
        put("http://localhost:3000/api/posts/"+ id, post)
        .subscribe(response => {
          const updatedPosts =  [...this.posts];
          const oldPostIndex = updatedPosts.findIndex (p => p.id === post.id);
          updatedPosts[oldPostIndex] = post;
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);

    });
  }

  deletePost(postId: string) {
       this.http.delete("http://localhost:3000/api/posts/"+ postId)
      .subscribe(()=>{
      const updatedPosts = this.posts.filter(post=> post.id !==postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
  });
}
}
