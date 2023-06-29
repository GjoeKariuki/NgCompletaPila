import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faBars, faHamburger} from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store';
import {  selectQuestions } from '../state/questionstate/questions.selector';
import { QuestionsPageActions } from '../state/questionstate/questions.actions';
import { Router, RouterModule } from '@angular/router';
import { iQuestion, iUser } from '../questions/questions.model';
import { selectAdminLatestView, selectAdminPreviousView } from '../state/admindashstate/adminview.selectors';
import { AdminViewActions } from '../state/admindashstate/adminview.actions';
import { selectUsers } from '../state/userstate/users.selector';
import {UsersActionApI} from '../state/userstate/users.action'
import { SearchfilterPipe } from '../services/searchfilter.pipe';
import { AdminusersfilterPipe } from '../services/adminusersfilter.pipe';


@Component({
  selector: 'app-dashadmin',
  standalone: true,
  imports: [CommonModule,FormsModule,FontAwesomeModule,RouterModule, SearchfilterPipe, AdminusersfilterPipe],
  templateUrl: './dashadmin.component.html',
  styleUrls: ['./dashadmin.component.css']
})
export class DashadminComponent implements OnInit {
  chk1$=this.store.select(selectAdminLatestView)
  chk2$=this.store.select(selectAdminPreviousView)
  questions$ = this.store.select(selectQuestions) 
  users$ = this.store.select(selectUsers)
  faHamburger = faHamburger
  faBars = faBars
  isNavopen= true
  iSmallScreen = false
  searchquestionkeyword = ''
  searchuserkeyword = ''

  
  constructor(private store:Store,private router:Router){
    this.store.subscribe((store) => console.log({store})
    )
    
  }

  ngOnInit(): void { 
  
    this.checkScreenSixe()
    window.addEventListener('resize', () => this.checkScreenSixe())
  }

  checkScreenSixe(){
    this.iSmallScreen = window.innerWidth < 768
    if(this.iSmallScreen){
      this.isNavopen = false
    }
    else{
      this.isNavopen = true
    }
  }

  toggleThis(){ 
    this.store.dispatch(AdminViewActions.toggleAdminLatestView())
    this.store.dispatch(AdminViewActions.toggleAdminPreviousView())
  }
  toggleThat(){ 
    this.store.dispatch(AdminViewActions.toggleAdminPreviousView())
    this.store.dispatch(AdminViewActions.toggleAdminLatestView())
  }

  toggleNav() {
    this.isNavopen = !this.isNavopen
  }
  
  deleteUser(user:iUser){
    alert("are you sure")
    this.store.dispatch(UsersActionApI.deleteUser({id:user.uemail}))
    this.router.navigate(['dash-view'])
  }
  deleteQuestion(ones:iQuestion){
    alert("are you sure")
    this.store.dispatch(QuestionsPageActions.deleteQuestion({id:ones.qid}))
    this.router.navigate(['dash-view'])
  }

}
