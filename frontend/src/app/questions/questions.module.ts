import { NgModule } from "@angular/core";
import { QuestionsRoutingModule } from "./questions-routing.module";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular"
import { StoreModule } from "@ngrx/store";
// import { questionsReducer } from "./questionstate/questions.reducer";
// import { EffectsModule } from "@ngrx/effects";
import { questionsReducer } from "./questionstate/questions.reducer";
import { EffectsModule } from "@ngrx/effects";
import { QuestionEffects } from "./questionstate/questions.effects";
// import { QuestionEffects } from "./questionstate/questions.effects";



@NgModule({
    declarations: [],
    imports: [
        QuestionsRoutingModule,CKEditorModule,
        StoreModule.forFeature('questions', questionsReducer),
        EffectsModule.forFeature([QuestionEffects])
        
    ],
    
})
export class QuestionsModule {}