import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store';
import { selectSingleUserbyEmail, useremail } from '../state/userstate/users.selector';
import {UsersActionApI} from '../state/userstate/users.action'
import { iUser } from '../questions/questions.model';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit {
  
  myuseremail!:string
 //myuser$ = 
  myuser$!:iUser
  faPenToSquare = faPenToSquare
  changepwd = false


  constructor(private store:Store){
    this.myuseremail = localStorage.getItem('email')! 
  }
   ngOnInit(): void {
    this.store.dispatch(UsersActionApI.getUserByEmail({email:this.myuseremail}))
    this.store.select(selectSingleUserbyEmail).subscribe(res => {
      if(res) { this.myuser$ = res }
    })
    //console.log(this.myuser$);
  }

  togglePwd()
  {
    this.changepwd = !this.changepwd
  }
  
}
