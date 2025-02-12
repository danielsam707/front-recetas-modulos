import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

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
    private tokenService: TokenService,
    
  ) {}

  onSubmit() {
    
    this.authServirce.login(this.email, this.password, this.device_name).subscribe(
      () => {
        this.router.navigate(['/inicio']);
      },
      error => {
        console.error('Error de autenticacion', error);
      }
    )
  }

}
