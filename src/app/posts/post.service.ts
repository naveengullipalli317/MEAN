import { Injectable } from '@angular/core';
import { Post} from './post.model';
import { Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";



@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[]=[];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();


  constructor(private http: HttpClient, private router: Router){}

  getPosts(postsPerPage: number, currentPage: number){
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, posts: any, maxPosts: number }>('http://localhost:3000/api/posts' + queryParams)
    //adding multiple operaters using pipe
    .pipe(map(postData =>{
        return { posts: postData.posts.map(post => {
          return {
            tittle: post.tittle,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath,
            creator: post.creator
          };
        }),
         maxPost: postData.maxPosts};
    })
    )
    .subscribe(transformedPostData=> {
      console.log(transformedPostData);
      this.posts = transformedPostData.posts;
      this.postsUpdated.next({
        posts: [...this.posts],
        postCount: transformedPostData.maxPost
    });
    });
  }

  getPostUpdateListener() {
  return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{_id:string, tittle:string, content:string, imagePath: string}>("http://localhost:3000/api/posts/"+ id);
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
       /*  const post: Post = {
          id: responseData.post.id,
           tittle: tittle,
            content: content,
          imagePath: responseData.post.imagePath};

        this.posts.push(post);
        this.postsUpdated.next([...this.posts]); */
        this.router.navigate(["/"]);
  });
}

  updatePost(id:string, tittle:string, content:string, image: File | string) {
    let postData: Post | FormData;
      if (typeof(image)== "object") {
        postData = new FormData();
        postData.append("id", id);
        postData.append("tittle", tittle);
        postData.append("content", content);
        postData.append("image", image, tittle);
      } else {
         postData = {
          id: id,
          tittle: tittle,
          content: content,
          imagePath: image
        };
      }

        this.http.
        put("http://localhost:3000/api/posts/"+ id, postData)
        .subscribe(response => {
          /* const updatedPosts =  [...this.posts];
          const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
          const post: Post = {
            id: id,
          tittle: tittle,
          content: content,
          imagePath: ""
          }
          updatedPosts[oldPostIndex] = post;
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]); */
          this.router.navigate(["/"]);

    });
  }

  deletePost(postId: string) {
       return this.http.delete("http://localhost:3000/api/posts/"+ postId)
      /* .subscribe(()=>{
      const updatedPosts = this.posts.filter(post=> post.id !==postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]); */
        }
      }
