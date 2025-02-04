
export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strIngredients: string[];  // Lista de ingredientes
  strMeasures: string[];     // Lista de medidas
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}

export interface MealsResponse {
  meals: Meal[];
}

export interface Categories {
  strCategory: string;
}


export interface MealBasic {
  strMeal: string;        // El nombre del plato
  strMealThumb: string;   // URL de la imagen del plato
  idMeal: string;
}
