import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule,DOCUMENT } from '@angular/common';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-questions-form',
  standalone: true,
  imports: [CommonModule,CKEditorModule,ReactiveFormsModule],
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.css']
})
export class QuestionsFormComponent implements OnInit {
  


  editor!:HTMLTextAreaElement
  tagInput!:HTMLInputElement
  tagsContainer!:HTMLDivElement
  public Editorred = ClassicEditor
  

  constructor(@Inject(DOCUMENT) private _document:Document) {}

  ngOnInit(): void {
    this.editor = this._document.getElementById('editor') as HTMLTextAreaElement
    this.tagInput = this._document.getElementById('tag-input') as HTMLInputElement
    this.tagsContainer = this._document.getElementById('tags-container') as HTMLDivElement
    this.tagInput.addEventListener('keydown', (event)=>{
      if(event.key == 'Enter' || event.key === ','){
          event.preventDefault()
          let tagText = this.tagInput.value.trim()
          if(tagText){
            this.createTag(tagText)
          }
          this.tagInput.value = ''
      }
    })
  }
  
  createTag(tagText:string){
    const tag = this._document.createElement('div')
    tag.classList.add('tag')
    tag.innerHTML = `
    <span>${tagText}</span>
    <span class="remove-tag" onclick="removeTag(event)">X</span>
    `
    this.tagsContainer.appendChild(tag)
  }

  removeTag(event:MouseEvent){
    const tagged = (event.target as HTMLElement).parentNode
    if(tagged instanceof Node){
      this.tagsContainer.removeChild(tagged)
    }
    
  }


}
