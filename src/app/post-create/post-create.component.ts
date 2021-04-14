import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
enteredTittle="";
enteredContent="";

@Output() postCreated = new EventEmitter();


onAddPost() {
  const post= {
    tittle: this.enteredTittle,
    content: this.enteredContent
  };
  this.postCreated.emit(post);

}
}
