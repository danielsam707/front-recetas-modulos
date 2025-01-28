import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/loginResponse.model';
import { Observable } from 'rxjs';
import { Login } from '../models/loginResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "http://127.0.0.1:8000"

  constructor(private http: HttpClient) {}

  login(email: string, password: string, device_name: string){
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/login`, {email, password, device_name });
  }



}
