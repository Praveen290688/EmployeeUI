import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string ="fa-eye-slash";
  loginForm!: FormGroup;


  constructor(private fb: FormBuilder, private auth : AuthService, private router : Router,
     private toast : NgToastService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
 }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash" ;
    this.isText ? this.type = "text" : this.type = "password";
  }

 onLogin(){
  if(this.loginForm.valid)
  {
     console.log(this.loginForm.value);
     this.auth.login(this.loginForm.value)
     .subscribe({
      next : (res) => {
        this.loginForm.reset();
        this.auth.storeToken(res.token);
        this.toast.success({detail : "SUCCESS", summary:res.message, duration: 5000});
        this.loginForm.reset();
        this.router.navigate(['employees contact']);
      },
      error : (err) => {
        
        this.toast.error({detail : "ERROR", summary:"Something Went Wrong", duration: 5000});
      }



     })
  }
  else
  {
    alert("Your Form is invalid")
  }
 }



}
