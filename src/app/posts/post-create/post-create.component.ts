import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
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
form: FormGroup;

private mode = 'create';
private postId: string;
 post: Post;


constructor(
  public PostService: PostService,
  public route:ActivatedRoute
  ) {}

ngOnInit() {
  this.form = new FormGroup({
    'tittle' : new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
    'content' : new FormControl(null, {validators:[Validators.required]}),
    'image' : new FormControl(null, {validators:[Validators.required]})
  });
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('postId')){
      this.mode = 'edit';
      this.postId = paramMap.get('postId');
      this.PostService.getPost('this.postId').subscribe(postData => {
        this.post = {id:postData._id,
                    tittle: postData.tittle,
                    content: postData.content};

        this.form.setValue({
          'tittle': this.post.tittle,
          'content': this.post.content
        });
      });


    }else {
      this.mode ='create';
      this.postId = null;
    }
  });
}

onImagePicked(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({image:file});
  this.form.get('image').updateValueAndValidity();
  console.log(file);
  console.log(this.form);
}

onSavePost() {
  //no post will add if we click the submit button without any content in the two fields.
  if(this.form.invalid){
    return;
  }
  if(this.mode === 'create') {
    this.PostService.addPost(this.form.value.tittle, this.form.value.content);
  } else {
    this.PostService.updatePost(
        this.postId,
        this.form.value.tittle,
        this.form.value.content);
  }
  // above function is used to submit the content with Data


 this.form.reset();
}
}
