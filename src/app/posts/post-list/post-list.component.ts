import { Component, OnDestroy, OnInit} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';


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
 posts: Post[]=[];
 private postsSub: Subscription;

  constructor(public postsService: PostService){}
  ngOnInit(){
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
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
  }
}
