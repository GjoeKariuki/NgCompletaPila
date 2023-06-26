import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { AuthService } from '../services/auth.service';
import { ShowerrorComponent } from '../showerror/showerror.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule,RouterModule, ReactiveFormsModule, FormsModule, ShowerrorComponent],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  siginForm!:FormGroup
  error!:string|{string:string}
  username!:string|null

  constructor(private fb:FormBuilder, private authenticate:AuthenticateService, private auth:AuthService,private router:Router, @Inject(PLATFORM_ID) private platformId:object ) {}

  ngOnInit(): void {
    this.siginForm = this.fb.group({
      uemail: ['',[Validators.required,Validators.email]],
      upassword: ['',[Validators.required,Validators.pattern(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`)]],
        })
    
  }

  submitForm(){
    //const {uemail,upassword} = this.siginForm.value
    console.log(this.siginForm.value)
    this.authenticate.login(this.siginForm.value).subscribe(
      (res) => {
        //console.log(res)
        if (res) {
          localStorage.setItem('role', res.token)
          localStorage.setItem('name', res.name)
          localStorage.setItem('token', res.token)
          
        }
        if (res.token) {
          this.router.navigate(['questioneos'])
        }

        
        // if (isPlatformBrowser(this.platformId)) {
        //   localStorage.setItem('role', res.token)
        //   localStorage.setItem('name', res.name)
        //   localStorage.setItem('token', res.token)
          
        // }
             
      }, (err) => {
        console.log(err)
        if(typeof(err) === 'object')   {
          this.error = err.error.message
        }else {
          this.error = err.error
        }  
      })
      
      
         
              
        
    
  }
  
  Close(){this.error=''}
  
}
