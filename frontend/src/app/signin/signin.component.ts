import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { AuthService } from '../services/auth.service';
import { ShowerrorComponent } from '../showerror/showerror.component';
import { Store } from '@ngrx/store';
import { TOAST_STATE, ToastuiService } from '../services/toastui.service';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, ShowerrorComponent],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  siginForm!: FormGroup
  username!: string | null
  signinerror = ''

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private authenticate: AuthenticateService,
    private auth: AuthService,
    private router: Router,
    private toastservice: ToastuiService,
    @Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit(): void {
    this.siginForm = this.fb.group({
      uemail: ['', [Validators.required, Validators.email]],
      upassword: ['', [Validators.required, Validators.pattern(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`)]],
    })

  }

  submitForm() {
    if(this.siginForm.valid){
 //const {uemail,upassword} = this.siginForm.value
 console.log(this.siginForm.value)
 this.authenticate.login(this.siginForm.value).subscribe(
   (res) => {
     //console.log(res)
     if (res) {
       //
       this.toastservice.showToast(TOAST_STATE.success, "login successfully")
       this.dismissError()
       console.log(res)
       this.auth.loginUser(res)
     }
     if (res.token) {
       this.router.navigate(['questioneos'])
     }

   }, (err) => {

     this.toastservice.showToast(TOAST_STATE.danger, "something went wrong could not login, try again")
     this.dismissError()
     console.log(this.signinerror)

   })
   
    }
   
  }
  private dismissError(): void {
    setTimeout(() => {
      this.toastservice.dismissToast()
    }, 7000)
  }

  

  //Close(){this.signinerror=''}

}
