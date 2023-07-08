import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AbstractControl, FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signinForm: FormGroup;
  email = '';
  password='';

constructor(private user:UserService,private router:Router,private formBuilder:FormBuilder ){
  this.signinForm = this.formBuilder.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required]]
     });

 // this.userId = userService.getCurrentUserId();
}
form = {
  email: '',
  password: ''
}
emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  signInUser() {
    this.user.checkUser(this.signinForm.value.email, this.signinForm.value.password)
      .subscribe(isValid => {
        if (isValid) {
          console.log('Sign-in successful');
          this.router.navigateByUrl("/home");
          // Redirect or perform any additional actions
        } else {
          console.log('Invalid credentials');
          // Handle invalid credentials, show error message, etc.
        }
      });
  }
  getControl(name:any):AbstractControl | null{
    return this.signinForm.get(name);
  }
  
}
