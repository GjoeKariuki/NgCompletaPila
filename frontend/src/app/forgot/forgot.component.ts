import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  forgotForm!:FormGroup
 
  constructor(private userservice:UsersService, private fb:FormBuilder){}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: new FormControl('', [Validators.required])
    })
  }
  submitForm(){
    console.log(this.forgotForm.value)
    const {email} = this.forgotForm.value
    this.userservice.sendUserNewPassword(email).subscribe(
      res => {if(res){console.log(res);
      }},
      error => {
        console.log(error);
        
      }
    )
    
  }

}
