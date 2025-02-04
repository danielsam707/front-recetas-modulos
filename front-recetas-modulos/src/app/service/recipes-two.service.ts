import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MealsResponse, Meal, MealBasic } from '../models/recepeTwo.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesTwoService {

  private apiUrl = "http://127.0.0.1:8000/api/v3/recipes/"

  constructor( private http: HttpClient) { }

  getMeal() {
    return this.http.get<MealsResponse>(`${this.apiUrl}`);
  }

  transformMealData(mealData: any) {
    
    return mealData.meals.map((meal:any) => {
      const ingredients: string[] = [];
      const measures: string[] = [];

      for(let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(meal[`strIngredient${i}`]);
          measures.push(meal[`strMeasure${i}`]);
        }
      }

      return {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strDrinkAlternate: meal.strDrinkAlternate,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
        strInstructions: meal.strInstructions,
        strMealThumb: meal.strMealThumb,
        strTags: meal.strTags,
        strYoutube: meal.strYoutube,
        strIngredients: ingredients,
        strMeasures: measures,
        strSource: meal.strSource,
        strImageSource: meal.strImageSource,
        strCreativeCommonsConfirmed: meal.strCreativeCommonsConfirmed,
        dateModified: meal.dateModified,
      };
      
    })
  }

  getCategories() {
    return this.http.get<any>(`${this.apiUrl}categories`);
  }

  recipeByCategory(name: string) {
    return this.http.get<MealBasic[]>(`${this.apiUrl}${name}`);
  }
}
