import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/loginResponse.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.getUserFromLocalStorage());
  public user$ = this.userSubject.asObservable();  // Observable que otros componentes pueden suscribirse

  apiUrl = environment.apiUrl // URL de la API

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) {}

  // Login
  login(email: string, password: string, device_name: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/login`, { email, password, device_name })
      .pipe(
        tap(response => {
          // Guardar el token en el servicio TokenService
          this.tokenService.saveToken(response.data.token);

          // Guardar los datos del usuario en localStorage
          localStorage.setItem('user', JSON.stringify(response.data.attributes));

          // Actualizar el BehaviorSubject con los nuevos datos del usuario
          this.userSubject.next(response.data.attributes);  // Notificar a los componentes
        })
      );
  }

  // Logout
  logout(): void {
    localStorage.removeItem('user');  // Eliminar los datos del usuario de localStorage
    this.userSubject.next(null);  // Notificar a los componentes que no hay usuario
    this.tokenService.deleteToken();  // Eliminar el token
  }

  // Obtener los datos del usuario desde localStorage
  private getUserFromLocalStorage(): any {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;  // Retornar el usuario o null si no existe
  }
}
