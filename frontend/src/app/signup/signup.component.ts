import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,RouterModule, ReactiveFormsModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!:FormGroup
  constructor(private fb:FormBuilder, private authentication:AuthenticateService,private router:Router){}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      uname: ['', [Validators.required]],
      uemail: ['', [Validators.email,Validators.required]],
      upassword: ['', [Validators.required,Validators.pattern(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`)]],
      confirmpassword: ['', [Validators.required,Validators.pattern(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`)]]
    })
  }

  submitForm(){
    //console.log(this.signupForm.value);    
    this.authentication.register(this.signupForm.value).subscribe(response => {
      if(response) {
        console.log(response);
        this.router.navigate(['signin']) 
      }           
    },
    error => {console.log(error);
    })
  }


}
