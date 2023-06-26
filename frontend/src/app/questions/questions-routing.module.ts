import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



const routes:Routes = [
    {path: 'questioneos/:id',  loadComponent: ()=> import("./question-detail/question-detail.component").then(b=>b.QuestionDetailComponent)},
    {path: '', loadComponent: ()=>import("./questions/questions.component").then(a=>a.QuestionsComponent)},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionsRoutingModule {}