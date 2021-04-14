import {Component, EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
enteredTittle="";
enteredContent="";

@Output() postCreated = new EventEmitter<Post>();


onAddPost(form:NgForm) {
  //no post will add if we click the submit button without any content in the two fields.
  if(form.invalid){
    return;
  }
  // above function is used to submit the content with Data
  const post: Post= {
    tittle: form.value.tittle,
    content: form.value.content
  };
  this.postCreated.emit(post);

}
}
