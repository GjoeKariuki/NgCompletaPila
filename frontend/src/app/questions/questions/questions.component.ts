import { Component, Renderer2,Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { QuestionsFormComponent } from '../questions-form/questions-form.component';
import { QuestionsListComponent } from '../questions-list/questions-list.component';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule,QuestionsFormComponent,QuestionsListComponent],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  sidebarVisible=true
  askquestionform = false
  constructor(private renderer2:Renderer2, @Inject(DOCUMENT) private _document:Document){}
  
  ngOnInit(): void {
    this.toggleSidebar()
  }
  toggleSidebar(){
    this.sidebarVisible = !this.sidebarVisible
    const sidebar = document.querySelector('.bg-gray-800') as HTMLDivElement
    sidebar.classList.toggle('hidden', !this.sidebarVisible)
  }

  toggleQuestionForm(){
    this.askquestionform = !this.askquestionform
  }
}
