import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

constructor(private user:UserService,private router:Router){}
form = {
  email: '',
  password: ''
}
emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  signInUser() {
    this.user.checkUser(this.form.email, this.form.password)
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
  
}
