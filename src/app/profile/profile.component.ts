import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // Replace 'path-to-user-service' with the actual path to your user service
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user={
    name:'',
    email:'',
    password:''
  }; // Assuming user object with properties like name, email, etc.
  userId:string ="";
  constructor(private route: ActivatedRoute,private userService: UserService) {}

  ngOnInit(): void {
    const uId = this.route.snapshot.params['id'];
    console.log(uId);
    this.fetchUserData(uId);
  }

  fetchUserData(id:any): void {
    // Assuming userService has a method called getUserData() to fetch user information
    this.userService.getUser(id).subscribe((res)=>{
      this.user=res;
      console.log(res)});
  }
}
