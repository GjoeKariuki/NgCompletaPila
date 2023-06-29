import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { QuestionsAPIActions, QuestionsPageActions } from '../../state/questionstate/questions.actions';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectSingleQuestion } from 'src/app/state/questionstate/questions.selector';
import { addTag, iQuesTag, iQuestion, iTag, updateQuestion } from '../questions.model';
import { getTags, getTagsbyQ } from 'src/app/state/tagstate/tags.action';
import { selectTags, selectTagsForSpecificQuestionid } from 'src/app/state/tagstate/tags.selector';
import { QuestionService } from '../question.service';
import { TagsService } from 'src/app/services/tags.service';



@Component({
  selector: 'app-updatequestion',
  standalone: true,
  imports: [CommonModule,CKEditorModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './updatequestion.component.html',
  styleUrls: ['./updatequestion.component.css']
})
export class UpdatequestionComponent implements OnInit{
  
  
  updateForm!:FormGroup
  public Editor = ClassicEditor  
  questionid!:string
  //display details to be updated
  //public model = {editorData: '<p>Hello there whats happening <strong>George</strong></p>'}
  myobjecdata!:iQuestion
  updatetags$!:iTag[]
  tagids:{} = {}

  constructor(private store:Store, private fb:FormBuilder, private questionservice:QuestionService, private tagservice:TagsService){}
  ngOnInit(): void {
    this.updateForm = this.fb.group({
      qtitle: ['', [Validators.required]],
      qbody: ['', [Validators.required]],
      qtags: ['', [Validators.required]]
    })    
   
    this.store.select(selectSingleQuestion).subscribe(
      res => {
        if(res){          
          // console.log('res' , res);
          this.myobjecdata = res
          this.questionid = res.qid
          this.updateForm.patchValue({
            qtitle: res.qtitle,
            qbody: res.qbody,
            
          })
          this.store.dispatch(getTagsbyQ({id:res.qid}))           
          this.store.select(selectTagsForSpecificQuestionid).subscribe(res => {
            if (res) {
            
              
              this.updatetags$ = res
              this.tagids = res.map(({tid,tname,qid}) => ({tid,tname,qid}))
              let mytgs = res.map(name => name.tname)
        
              if(mytgs.length > 0){
                this.updateForm.patchValue({
                  qtags: mytgs
                })
              }
              else {
                this.updateForm.patchValue({
                  qtags: ""
                })
              }
              
              
            }
          }, error => {
            console.log(error);
          })       
        }   
      },
      error => {
        console.log('err' , error);
        
      }
    )
 

    
  }

  
  getTagsforQuestion(qid:string){
    return this.updatetags$.filter(tg => tg.qid === qid)
  }


  closeModal(){
   
    
    this.store.dispatch(QuestionsPageActions.toggleShowModalView())
  }
  
  
  
  updatequest(val:updateQuestion){
    this.questionservice.updateQuestion(this.questionid,val).subscribe(
      res => {if(res){console.log(res);
      }},
      error => {console.log(error);
      }
    )  
  }
  submitupdateForm(){
    
    const { qtitle, qbody, qtags } = this.updateForm.value
    const updatevalues = { qtitle, qbody }
    const tagupdates = {qid:this.questionid, tname:qtags}   
  
      this.tagservice.deleteQuestionTag(this.questionid).subscribe(
        res => {
          if (res) {
            console.log(res)
            this.tagservice.createTag(tagupdates).subscribe(
              res => {if(res){
                console.log(res)
                this.closeModal()        
              }},
              err => {console.log(err);
              }
            )
          }
        },
        err => {
          console.log(err);
  
        }
      ) 
    
   
    //console.log(tagupdates);
    
    //this.creatag(tagupdates)
    //this.updatequest(updatevalues)
        
      
  //   // //this.store.dispatch(QuestionsAPIActions.questionUpdate({updatequestion:{qtitle, qbody,tname:qtags}, id:this.questionid}))
  //  this.store.dispatch(QuestionsAPIActions.loadQuestions())
  //  this.store.dispatch(QuestionsPageActions.loadQuestions())
  //  this.store.dispatch(getTags())
 
    
  }
}
