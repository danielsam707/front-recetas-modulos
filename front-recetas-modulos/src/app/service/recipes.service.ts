import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CategoryData, Recipe, RecipeAttributes, RecipeData } from '../models/recipeData.model';
import { RecipeAPost } from '../models/recipeData.model';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from '../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  apiUrl = environment.apiUrl

  private recetasUsuarioSource = new BehaviorSubject<Recipe[]>([]);
  recetasUsuario$ = this.recetasUsuarioSource.asObservable();

  private recetaSubjet= new BehaviorSubject<Recipe | null>(null);
  receta$ = this.recetaSubjet.asObservable();



  constructor(
    private http: HttpClient,
  ) { }

  setRecipe(receta: Recipe) {
    console.log('Receta a establecer:', receta); 
    this.recetaSubjet.next(receta);
  }

  getRecipe(): Recipe | null {
    return this.recetaSubjet.getValue();
  }

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

  updateRecipe(formData: any,id: string | null) {
    return this.http.put(`${this.apiUrl}/api/v1/recipes/${id}`, formData);
    console.log('Mensaje desde el servicio en el metodo updataRecipe');
    
  }

  deleteRecipe(id: string) {
    console.log('id en servicio', id)
    return this.http.delete<any>(`${this.apiUrl}/api/v1/recipes/${id}`);
    console.log('Receta eliminada')
  }

  getTags() {
    return this.http.get<any>(`${this.apiUrl}/api/v1/tags`);
  }
}
