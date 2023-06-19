import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Question } from '../questions.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [CommonModule,RouterModule, ],
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent {
  @Input() questions:Question[]|null = []

 

  // questions = [
  //   {id:1, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},
            
  //           {id:1, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},
  //           {id:1, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},
  //           {id:1, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},
  //           {id:1, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},            
  //           {id:1, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},

  //           {id:1, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},
  //           {id:1, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]},
  //           {id:1, Title: "How do i style the inner paragraphs with italics and colors", Body:["<div><p>loremsdjfbsjdfjsfs</p><p>loremsdjfbsjdfjsfs</p></div>"], Tags:["html","css"]}

  // ]
}
