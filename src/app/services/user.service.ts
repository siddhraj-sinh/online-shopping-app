import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable,map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${userId}`);
  }
  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${userId}`, userData);
  }

  url = "http://localhost:3000/users";

  addUser(user:any):Observable<any>{
   return this.http.post(this.url,user);
  }

  checkUser(email:string,password:string):Observable<boolean>{
    interface User {
      email: string;
      name: string;
      password: string;
    }
    return this.http.get<User[]>(this.url).pipe(
      map((users: User[]) => {
        const user = users.find(u => u.email === email && u.password === password);
        return !!user; // Returns true if user credentials are found, otherwise false
      })
    );
  }
}
