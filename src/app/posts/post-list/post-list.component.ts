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
 pageSizeOptions = [1 ,2 ,5 ,7 ];
 posts: Post[]=[];
 private postsSub: Subscription;

  constructor(public postsService: PostService){

  }
  ngOnInit(){
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;

    });
  }

  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
  }


  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
