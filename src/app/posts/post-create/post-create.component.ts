import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
enteredTittle="";
enteredContent="";
private mode = 'create';
private postId: string;
 post: Post;


constructor(public PostService: PostService, public route:ActivatedRoute){}

ngOnInit() {
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('postId')){
      this.mode = 'edit';
      this.postId = paramMap.get('postId');
      this.post = this.PostService.getPost('this.postId');

    }else {
      this.mode ='create';
      this.postId = null;
    }
  });
}

onSavePost(form:NgForm) {
  //no post will add if we click the submit button without any content in the two fields.
  if(form.invalid){
    return;
  }
  if(this.mode === 'create') {
    this.PostService.addPost(form.value.tittle, form.value.content);
  } else {
    this.PostService.updatePost(
        this.postId,
        form.value.tittle,
        form.value.content);
  }
  // above function is used to submit the content with Data


 form.resetForm();
}
}
