import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment'; 
import es from '../../../public/i18n/es.json';
import en from '../../../public/i18n/en.json'

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private language: 'es' | 'en' = 
  (['es', 'en'].includes(environment.defaultLanguage) 
    ? environment.defaultLanguage 
    : 'es') as 'es' | 'en';

  private translations: Record<'es' | 'en', any> = { es, en };

  setLanguage(lang: 'es' | 'en') {
    this.language = lang;
  }

  translate(key: string): string {
    return this.translations[this.language][key] || key;
  }
}
