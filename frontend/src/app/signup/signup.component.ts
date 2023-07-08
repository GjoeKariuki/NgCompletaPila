import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { TOAST_STATE, ToastuiService } from '../services/toastui.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup
  constructor(private toastservice: ToastuiService, private fb: FormBuilder, private authentication: AuthenticateService, private router: Router) { }

  ngOnInit(): void {
    this.createSignupForm()

  }

  createSignupForm() {
    this.signupForm = this.fb.group({
      uname: [null, [Validators.required, Validators.minLength(4)]],
      uemail: [null, [Validators.required, Validators.email]],
      upassword: [null, [Validators.required, Validators.minLength(6)]],
      confirmpassword: [null, [Validators.required, Validators.minLength(6)]]
    }, {
      validator:this.validatePassword
    })
    //this.signupForm.addValidators(this.passwordValidateMatch(this.signupForm.get('upassword') as AbstractControl, this.signupForm.get('confirmpassword') as AbstractControl))
  }

  passwordValidateMatch(control: AbstractControl, control2: AbstractControl) {
    return () => {
      if (control.value !== control2.value) {
        return { match_error: 'values do not match' }
      }
      return null
    }
  }

  validatePassword(formGroup:FormGroup){
    if(formGroup.controls['upassword'].value && formGroup.controls['confirmpassword'].value){
      return formGroup.controls['upassword'].value === formGroup.controls['confirmpassword'].value ? false:{"notMatched":true}
    }
    return false
  }

  submitForm() {
    if (this.signupForm.valid) {
      //console.log(this.signupForm.value);    
      this.authentication.register(this.signupForm.value).subscribe(response => {
        if (response) {
          this.toastservice.showToast(TOAST_STATE.success, "user successfully registered")
          this.dismissError()
          console.log(response);
          this.router.navigate(['signin'])
        }
      },
        error => {
          this.toastservice.showToast(TOAST_STATE.warning, "something wrong happened try again")
          this.dismissError()
          console.log(error);
        })
    }

  }

  private dismissError(): void {
    setTimeout(() => {
      this.toastservice.dismissToast()
    }, 6000)
  }


}
