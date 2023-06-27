import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FooterComponent } from './footer/footer.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { IndbMemoryService } from './indb-mem.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment.development';
// import { InterceptokenService } from './services/interceptoken.service';
import { adminViewreducer } from './state/admindashstate/adminview.reducers';
import { questionReducer } from './state/questionstate/question.reducer';
import { tagsReducer } from './state/tagstate/tags.reducers';
import { QuestionEffects } from './state/questionstate/questions.effects';
import { TagsEffects } from './state/tagstate/tags.effects';



@NgModule({
  declarations: [
    AppComponent,   
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    AppRoutingModule,
    // InMemoryWebApiModule.forRoot(IndbMemoryService),
    NavigationComponent,
    FooterComponent,
    FontAwesomeModule,
    
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(IndbMemoryService),
    StoreModule.forRoot({router:routerReducer, questions:questionReducer, adminview:adminViewreducer,tags:tagsReducer}),     
    StoreDevtoolsModule.instrument({name:"Ngfrontend",maxAge:25,logOnly:environment.production}),
    EffectsModule.forRoot([QuestionEffects,TagsEffects]),
    StoreRouterConnectingModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
