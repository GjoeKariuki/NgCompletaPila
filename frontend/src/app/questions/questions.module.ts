import { NgModule } from "@angular/core";
import { QuestionsRoutingModule } from "./questions-routing.module";
import { BrowserModule } from '@angular/platform-browser'
import {CKEditorModule} from "@ckeditor/ckeditor5-angular"
import { StoreModule } from "@ngrx/store";

import { questionsReducer } from "../state/questionstate/questions.reducer";
import { EffectsModule } from "@ngrx/effects";
import { QuestionEffects } from "../state/questionstate/questions.effects";




@NgModule({
    declarations: [],
    imports: [
        QuestionsRoutingModule,
        CKEditorModule,
        StoreModule.forFeature('questions', questionsReducer),
        EffectsModule.forFeature([QuestionEffects])        
    ],
    
})
export class QuestionsModule {}