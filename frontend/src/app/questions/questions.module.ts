import { NgModule } from "@angular/core";
import { QuestionsRoutingModule } from "./questions-routing.module";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular"



@NgModule({
    declarations: [],
    imports: [
        QuestionsRoutingModule,CKEditorModule
    ],
    
})
export class QuestionsModule {}