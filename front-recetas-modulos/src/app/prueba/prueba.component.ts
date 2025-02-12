import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../models/usuario.model';
@Component({
  selector: 'app-prueba',
  standalone: false,
  
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {

    email: string = '';
    password: string = '';
  
    constructor(
      private authServirce: AuthService,
      
    ) {}

    onSubmit() {
      
    }
  
  
}
