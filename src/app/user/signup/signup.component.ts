import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  constructor(private user:UserService,private router:Router){}
  form = {
    name:'',
    email:'',
    password:''
  }

  emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
  registerUser(){
    console.log(this.form);
  this.user.addUser(this.form).subscribe(res=>{
    console.log(res);
    this.router.navigateByUrl('/home');
  });

  }
}
