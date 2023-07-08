import { Component,OnInit  } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AbstractControl, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  profileForm!: FormGroup;
  currentUser: any;

  constructor(private userService:UserService,private router:Router){}

  ngOnInit(): void {
    this.initializeForm();
    this.getCurrentUser();
  }
  initializeForm() {
    this.profileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  getCurrentUser() {
    const userId = this.userService.getCurrentUserId();
    console.log(userId);
    if (userId) {
      this.currentUser = this.userService.getUserById(userId).subscribe((res)=>{
        console.log(res);
        if (this.currentUser) {
          this.currentUser=res;
          this.profileForm.patchValue({
            name: this.currentUser.name,
            email: this.currentUser.email,
            password: this.currentUser.password // Leave password field blank for security reasons
          });
        }
      }); // Implement this method in the UserService to fetch user details by ID
      console.log(this.currentUser);
     
    }
  }

  getControl(name:any):AbstractControl | null{
    return this.profileForm.get(name);
  }

  updateProfile() {
    if (this.profileForm.valid) {
      const updatedUser = {
        name: this.profileForm.value.name,
        email: this.profileForm.value.email,
        password: this.profileForm.value.password
      };

      const userId = this.userService.getCurrentUserId();
      if (userId) {
        this.userService.updateUserDetails(userId, updatedUser).subscribe(() => {
          // Handle success
          this.router.navigate(['/home']);
          console.log('Profile updated successfully!');
        });
      }
    }
  }
}
