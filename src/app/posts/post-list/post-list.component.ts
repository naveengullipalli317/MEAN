import { Component, OnDestroy, OnInit} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Authservice } from '../../auth/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

 totalPosts = 0;
 postsPerPage = 2;
 currentPage = 1;
 pageSizeOptions = [1 ,2 ,5 ,7 ];
 userIsAuthenticated = false;
 userId: string;
 posts: Post[]=[];
 private postsSub: Subscription;
 private authStatusSub: Subscription;

  constructor(public postsService: PostService,private Authservice: Authservice ){}
  ngOnInit(){
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.Authservice.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
    this.userIsAuthenticated = this.Authservice.getIsAuth();
    this.authStatusSub = this.Authservice
      .getAuthStatusListner()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.Authservice.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }


  onDelete(postId: string){
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }
  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
