export interface RecipeData {
    data: Recipe[];
}

export interface Recipe {
    id: number;
    type: string;
    attributes: RecipeAttributes;
}

export interface RecipeAttributes {
    category: string;
    author: string;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    image: string;
    tags: string;
}

export interface RecipeAPost extends Omit<RecipeAttributes, 'tags'> {
    tags: string[];  // Ahora `tags` es un array de cadenas
}


export interface CategoryData {
    data: Category[];
}

export interface CategoryRelationships {
  recipes: Recipe[];  // Array de recetas relacionadas
}

export interface Category {
    id: number;
    type: string;
    attributes: CategoryAttributes;
    relationships: CategoryRelationships;  // Añadimos relationships

}

export interface CategoryAttributes {
    name: string;
}

export interface Tag {
    id: number;
    type: string;
    attributes: TagAttributes;
}

export interface TagAttributes {
    name: string;
}