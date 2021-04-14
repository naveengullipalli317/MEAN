import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
enteredTittle="";
enteredContent="";



constructor(public PostService: PostService){}

onAddPost(form:NgForm) {
  //no post will add if we click the submit button without any content in the two fields.
  if(form.invalid){
    return;
  }
  // above function is used to submit the content with Data

  this.PostService.addPost(form.value.tittle, form.value.content)

}
}
