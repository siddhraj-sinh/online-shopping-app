import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup
  name='';
  email='';
  password='';

  constructor(private user:UserService,private router:Router,private formBuilder:FormBuilder){
    this.signupForm=this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      password :['',Validators.required]
    });
  }
  form = {
    name:'',
    email:'',
    password:''
  }

  emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
  registerUser(){
    console.log(this.signupForm);
  this.user.addUser(this.signupForm.value).subscribe(res=>{
    console.log(res);
    this.router.navigateByUrl('/user/signin');
  });

  }

  getControl(name:any):AbstractControl | null{
    return this.signupForm.get(name);
  }
}
