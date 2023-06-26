import { NgModule } from "@angular/core";
import { QuestionsRoutingModule } from "./questions-routing.module";
import { BrowserModule } from '@angular/platform-browser'
import {CKEditorModule} from "@ckeditor/ckeditor5-angular"
import { StoreModule } from "@ngrx/store";

import { questionReducer } from "../state/questionstate/question.reducer";
import { EffectsModule } from "@ngrx/effects";
import { QuestionEffects } from "../state/questionstate/questions.effects";




@NgModule({
    declarations: [],
    imports: [
        QuestionsRoutingModule,
        CKEditorModule,
        StoreModule.forFeature('questions', questionReducer),
        EffectsModule.forFeature([QuestionEffects])        
    ],
    
})
export class QuestionsModule {}