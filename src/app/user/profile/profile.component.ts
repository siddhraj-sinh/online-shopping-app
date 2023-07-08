import { Component,OnInit  } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  profileForm!: FormGroup;
  currentUser: any;

  constructor(private formBuilder: FormBuilder,private userService:UserService){}

  ngOnInit(): void {
    this.initializeForm();
    this.getCurrentUser();
  }
  initializeForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  getCurrentUser() {
    const userId = this.userService.getCurrentUserId();
    if (userId) {
      this.currentUser = this.userService.getUserById(userId); // Implement this method in the UserService to fetch user details by ID
      if (this.currentUser) {
        this.profileForm.patchValue({
          name: this.currentUser.name,
          email: this.currentUser.email,
          password: '' // Leave password field blank for security reasons
        });
      }
    }
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
          console.log('Profile updated successfully!');
        }, (error) => {
          // Handle error
          console.error('Failed to update profile:', error);
        });
      }
    }
  }
}
