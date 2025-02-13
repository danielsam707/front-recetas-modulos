import { Component } from '@angular/core';
import { TranslationService } from '../service/translation.service';

@Component({
  selector: 'app-pagina-inicio',
  standalone: false,
  
  templateUrl: './pagina-inicio.component.html',
  styleUrl: './pagina-inicio.component.css'
})
export class PaginaInicioComponent {
constructor(
      private translationService: TranslationService,
    ) {}

  t(key: string) {
    return this.translationService.translate(key);
  }

}
