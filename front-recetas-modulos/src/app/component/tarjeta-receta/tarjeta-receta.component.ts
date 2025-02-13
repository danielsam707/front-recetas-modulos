import { Component } from '@angular/core';
import { MealBasic } from '../../models/recepeTwo.model';
import { Input } from '@angular/core';
import { TranslationService } from '../../service/translation.service';

@Component({
  selector: 'app-tarjeta-receta',
  standalone: false,
  
  templateUrl: './tarjeta-receta.component.html',
  styleUrl: './tarjeta-receta.component.css'
})
export class TarjetaRecetaComponent {
  @Input() receta!: MealBasic;

  constructor(
      private translationService: TranslationService,
    ) {}

  t(key: string) {
    return this.translationService.translate(key);
  }

}
