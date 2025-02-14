import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TranslationService } from '../service/translation.service';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    public router: Router,
    private authService: AuthService,
    private translationService: TranslationService,
    
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
    console.log('metodo logout')
    this.authService.logout()
    this.router.navigate(['']); // Redirige al usuario al login (o a la página que prefieras)
  }

  t(key: string) {
    return this.translationService.translate(key);
  }

  changeLanguage(lang: 'es' | 'en') {
    this.translationService.setLanguage(lang);
  }


}
