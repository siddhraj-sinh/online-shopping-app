import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  url:string ="http://localhost:3000/orders"; 

  addOrder(item:any):Observable<any>{
    return this.http.post(this.url,item)
  }
  getOrderHistory(userId: number): Observable<any[]> {
    const url = `${this.url}?userId=${userId}`;
    return this.http.get<any[]>(url);
  }
  getOrderDetails(orderId: number): Observable<any> {
    const url = `${this.url}/${orderId}`;
    return this.http.get<any>(url);
  }
}
