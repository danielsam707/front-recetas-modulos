import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {

  }

  user: any;

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }



  getUserName(): string {
    return this.user ? this.user.name : 'Usuario no encontrado';
  }

  logoutUser(): void {
    this.authService.logout()
    this.router.navigate(['/login']); // Redirige al usuario al login (o a la página que prefieras)
  }


}
