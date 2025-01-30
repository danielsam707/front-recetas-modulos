import { Component } from '@angular/core';
import { RecipesService } from '../service/recipes.service';
import { Category, Tag } from '../models/recipeData.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';



@Component({
  selector: 'app-fomulario',
  standalone: false,
  
  templateUrl: './fomulario.component.html',
  styleUrl: './fomulario.component.css'
})
export class FomularioComponent {


  listaCategorias: Category[] = [];
  tags: Tag[] = [];
  recetaForm: FormGroup;


  constructor(
    private recipeService: RecipesService,
    private fb: FormBuilder,
    private router: Router,

  ) {
    // Inicializamos el FormGroup aquí
    this.recetaForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      category_id: ['', Validators.required],
      tags: [[[]], Validators.required],
      image: []
    });
  }
  ngOnInit(): void {
    this.obtenerTags();
    this.obtenerCategorias()
    
  }

  obtenerTags() {
    this.recipeService.getTags().subscribe((response) => {
      //console.log('Esta es la lista de tags', response);
      this.tags = response.data 
      console.log(this.tags)

    });
  }

  obtenerCategorias() {
    this.recipeService.getAllCategory()?.subscribe(
      response => {
        console.log('Esta es la lista de Categorias', response);
        this.listaCategorias = response.data;
        console.log(this.listaCategorias)
      }
    )
  }

  onSubmit() {
    if (this.recetaForm.valid) {
      const formData = new FormData();
  
      // Agregar los valores del formulario al FormData
      formData.append('title', this.recetaForm.get('title')?.value);
      formData.append('description', this.recetaForm.get('description')?.value);
      formData.append('ingredients', this.recetaForm.get('ingredients')?.value);
      formData.append('instructions', this.recetaForm.get('instructions')?.value);
      formData.append('category_id', this.recetaForm.get('category_id')?.value);
      formData.append('tags', JSON.stringify(this.recetaForm.get('tags')?.value));
  
      // Obtener el archivo de imagen del input
      const imageFile = (document.getElementById('image') as HTMLInputElement).files?.[0];
      if (imageFile) {
        // Asegúrate de que el archivo está siendo añadido correctamente
        console.log('Imagen seleccionada:', imageFile);
        formData.append('image', imageFile, imageFile.name);  // Agregar el archivo como 'image'
      } else {
        console.log('No se ha seleccionado una imagen');
      }
  
      // Aquí imprimimos todo el contenido de formData
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
  
      // Realizar la solicitud
      this.recipeService.createRecipe(formData).subscribe({
        next: (response) => {
          console.log('Receta creada con éxito', response);
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Error al crear receta', err);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
  

  capture(e: any) {
    console.log(e)
  }


}





