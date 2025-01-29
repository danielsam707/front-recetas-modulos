import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CategoryData, Recipe, RecipeData } from '../models/recipeData.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  apiUrl = "http://127.0.0.1:8000"

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
}
