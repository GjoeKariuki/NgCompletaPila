import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faArrowAltCircleDown, faSave} from '@fortawesome/free-regular-svg-icons'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store';
import { selectSingleUserbyEmail, useremail } from '../state/userstate/users.selector';
import {UsersActionApI} from '../state/userstate/users.action'
import { iUser } from '../questions/questions.model';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit {
  
  faArrowAltCircleDown = faSave
  myuseremail!:string
 //myuser$ = 
  myuser$!:iUser
  faPenToSquare = faPenToSquare
  changepwd = false
  ablename=true
  ableemail=true
  

  constructor(private store:Store, private userservice:UsersService, private router:Router){
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
  
  disablename() { this.ablename = !this.ablename}
  disableemail() { this.ableemail = !this.ableemail }
  updateName(newname:string) { 
   console.log(newname)   
   let userid = this.myuser$.uid
   const {uemail,upassword,urole,uprofPic} = this.myuser$
   let newuserobject = {uname:newname,uemail,upassword,urole,uprofPic}
    this.userservice.updateUser(userid, newuserobject ).subscribe(
      res => {if(res){
        console.log(res)        
      }},
      error => {if(error) {
        console.log(error);
        
      }}
    )
    this.ablename = !this.ablename }
  updateEmail(newemail:string) { 
    console.log(newemail);  
    let userid = this.myuser$.uid  
    const {uname,upassword,urole,uprofPic} = this.myuser$
   let newuserobject = {uname,uemail:newemail,upassword,urole,uprofPic}
   this.userservice.updateUser(userid, newuserobject ).subscribe(
    res => {if(res){
      console.log(res)        
    }},
    error => {if(error) {
      console.log(error);
      
    }}
  )
    this.ableemail = !this.ableemail}



    changeuserPassword(oldpwd:string, newpwd:string){
      let userid = this.myuser$.uid  
      let passwordobjectts = {oldpwd,newpwd}
      // console.log(userid)
      // console.log(passwordobjectts)  
      
      this.userservice.resetUserPassword(userid, passwordobjectts).subscribe(
        res => {
          if(res){
            console.log(res);
            this.router.navigate(['/profile-info'])
            
          }
        },
        error => {
          console.log(error);
          
        }
      )
    }
}
