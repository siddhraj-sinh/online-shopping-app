import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  url:string ="http://localhost:3000/products"; 

  loadAllProducts():Observable<any[]>{
   return this.http.get<any[]>(this.url);
  }

  getProductById(productId: string): Observable<any> {
    const url = `${this.url}/${productId}`;
    return this.http.get<any>(url);
  }
}
