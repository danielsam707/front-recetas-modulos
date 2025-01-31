import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CategoryData, Recipe, RecipeData } from '../models/recipeData.model';
import { RecipeAPost } from '../models/recipeData.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  apiUrl = "http://127.0.0.1:8000"

  private recetasUsuarioSource = new BehaviorSubject<Recipe[]>([]);
  recetasUsuario$ = this.recetasUsuarioSource.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  getAllRecipes() {
    
    return this.http.get<RecipeData>(`${this.apiUrl}/api/v1/recipes`);
  }

  getAllCategory() {
    
    return this.http.get<CategoryData>(`${this.apiUrl}/api/v1/categories`);
  }

  getRecipesByCategory(id: number) {
    return this.http.get<any>(`${this.apiUrl}/api/v1/categories/${id}`);
  }

  setRecetasUsuario(recetas: Recipe[]) {
    this.recetasUsuarioSource.next(recetas);
  }

  getRecetasUsuario() {
    return this.recetasUsuarioSource.getValue()
  }

  getRecipeById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/api/v1/recipes/${id}`)
  }

  createRecipe(formData: FormData) {
    return this.http.post(`${this.apiUrl}/api/v1/recipes`, formData);
  }

  getTags() {
    return this.http.get<any>(`${this.apiUrl}/api/v1/tags`);
  }
}
