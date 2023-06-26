import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {path:  'dash-view', loadComponent: () => import("./dashadmin/dashadmin.component").then(g=>g.DashadminComponent)},
  {path:  'profile-info',  loadComponent: ()=>import("./profile/profile.component").then(f=>f.ProfileComponent)},
  {path:  'questioneos',  loadChildren: () => import("./questions/questions.module").then(e=>e.QuestionsModule)},
  {path:  'forgotpwd', loadComponent: () => import("./forgot/forgot.component").then(d=>d.ForgotComponent)},
  {path:  'signin', loadComponent: () => import("./signin/signin.component").then(b=>b.SigninComponent)},
  {path:  'signup', loadComponent: () => import("./signup/signup.component").then(c=>c.SignupComponent)},
  {path:  '', loadComponent: () => import("./landing/landing.component").then(a=>a.LandingComponent)},
  {path:  '**', loadComponent: () => import("./pagenotfound/pagenotfound.component").then(h=>h.PagenotfoundComponent)},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
