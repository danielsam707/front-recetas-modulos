import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Receta } from '../models/receta.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  apiUrl = "http://127.0.0.1:8000"

  constructor(
    private http: HttpClient,
  ) { }

  getAllRecipes() {
    const token = localStorage.getItem('token');

    if(!token) {
      console.log('No se encontro el token');
      return
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    }
    return this.http.get<Receta>(`${this.apiUrl}/api/v1/recipes`, {headers});
  }
}
