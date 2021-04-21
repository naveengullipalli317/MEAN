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

 totalPosts = 10;
 postsPerPage = 2;
 currentPage = 1;
 pageSizeOptions = [1 ,2 ,5 ,7 ];
 posts: Post[]=[];
 private postsSub: Subscription;

  constructor(public postsService: PostService){

  }
  ngOnInit(){
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;

    });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }


  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
