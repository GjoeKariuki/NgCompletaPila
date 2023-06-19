// import { Injectable } from "@angular/core";
// import { Question } from "./questions.model";
// import { ComponentStore } from "@ngrx/component-store";
// import { QuestionService } from "./question.service";
// import { exhaustMap, tap } from "rxjs";


// interface QuestionState {
//     questions:Question[]
// }

// @Injectable()
// export class QuestionsStore extends ComponentStore<QuestionState>{
//     questions$ = this.select((state) => state.questions)
//     constructor(private questionService:QuestionService){
//         super({questions:[]})
//     }
//     addQuestions = this.updater((state,questions:Question[]) => (
//         {...state,questions}
//     ))

//     getQuestions = this.effect((trigger$) => trigger$.pipe(
//         exhaustMap(() => this.questionService.getallQuestions().pipe(tap({next:this.addQuestions})))
//     ))
// }
