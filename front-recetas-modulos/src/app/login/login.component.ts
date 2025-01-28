import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  device_name: string = 'P';

  constructor(
    private authServirce: AuthService,
    private router: Router,
    
  ) {}

  onSubmit() {
    const loginData = { email: this.email, password: this.password, device_name: this.device_name };
    console.log('Datos a enviar:', loginData);
    
    this.authServirce.login(this.email, this.password, this.device_name).subscribe(
      response => {

        console.log('Respuesta de la API; ', response);
        const usuario = response.data.attributes;
        const token = response.data.token;

        

        localStorage.setItem('token', token);
        this.router.navigate(['']);
      },
      error => {
        console.error('Error de autenticacion', error);
      }
    )

      
  }

}
