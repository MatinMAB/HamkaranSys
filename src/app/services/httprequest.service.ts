import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  addProduct,
  addUser,
  editProduct,
  editUser,
  loginUser,
} from '../models/user.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttprequestService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/users/current');
  }

  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/users');
  }

  getProducts(): Observable<editProduct | string> {
    return this.http.get<editProduct>('http://localhost:3000/api/products');
  }

  createProduct(product: addProduct): Observable<addProduct | string> {
    return this.http.post<addProduct>(
      'http://localhost:3000/api/products',
      product
    );
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/users/current');
  }

  editUser(user: editUser): Observable<editUser | string> {
    return this.http.put<editUser>('http://localhost:3000/api/users', user);
  }
  editProduct(product: editProduct): Observable<editProduct | string> {
    return this.http.put<editProduct>(
      'http://localhost:3000/api/products',
      product
    );
  }

  createUser(user: addUser): Observable<addUser | string> {
    return this.http.post<addUser>('http://localhost:3000/api/users', user);
  }

  login(user: loginUser): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth', user);
  }
}
