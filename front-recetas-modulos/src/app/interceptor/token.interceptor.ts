import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');  // O usa el servicio TokenService si lo prefieres

    if (token) {
      // Si el token está disponible, agrega el token a los encabezados de la solicitud
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(clonedRequest);  // Pasa la solicitud clonada
    }

    return next.handle(req);  // Si no hay token, pasa la solicitud tal cual
  }
}
