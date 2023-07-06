import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable,map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserKey = 'currentUser';
  constructor(private http:HttpClient) { }

  url = "http://localhost:3000/users";

  addUser(user:any):Observable<any>{
   return this.http.post(this.url,user);
  }

  checkUser(email:string,password:string):Observable<boolean>{
    interface User {
      id:number;
      email: string;
      name: string;
      password: string;
    }
    return this.http.get<User[]>(this.url).pipe(
      map((users: User[]) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem(this.currentUserKey, user.id.toString()); // Store user ID in local storage
          return true;
        } else {
          return false;
        }
      })
    );
  }
  getCurrentUserId(): number | null {
    const userId = localStorage.getItem(this.currentUserKey);
    return userId ? parseInt(userId, 10) : null; // Parse user ID from local storage
  }

  clearCurrentUser() {
    localStorage.removeItem(this.currentUserKey); // Remove user ID from local storage
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUserId(); // Check if user ID exists in local storage
  }
}
