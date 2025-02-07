import { Component } from '@angular/core';
import { RecipesService } from '../service/recipes.service';
import { Category, Recipe, Tag } from '../models/recipeData.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-fomulario',
  standalone: false,

  templateUrl: './fomulario.component.html',
  styleUrl: './fomulario.component.css'
})
export class FomularioComponent {

  listaCategorias: Category[] = [];
  listaTags: Tag[] = [];
  recetaForm: FormGroup;
  isEditing: boolean = false; // Para saber si estamos editando
  receta!: Recipe;
  recetaId: string | null = null; // Para almacenar el id de la receta
  categoryname: string = '';
  categoryId!: number;

  tagName: string = '';
  tagId!: number; 

  //---------------------------------------------------------------------------------------------------------------
  constructor(
    private recipeService: RecipesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,


  ) {

    // Inicializamos el FormGroup aquí
    this.recetaForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      category_id: ['', Validators.required], //
      tags: ['', Validators.required],
      image: []
    });
  }


  //-----------------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.obtenerTags();
    this.obtenerCategorias()

    this.recetaId = this.route.snapshot.paramMap.get('id'); // Obtener el ID desde la ruta

    if (this.recetaId) {
      this.isEditing = true;
      this.obtenerReceta(this.recetaId); // Si hay ID, es modo edición, obtenemos los datos
      console.log('Valor de isEditing', this.isEditing)
      this.obtenerCategoriaActual();
    }

  }


  //----------------------------------------------------------------------------------------------------------
  obtenerReceta(id: string) {
    this.recipeService.getRecipeById(id).subscribe((response) => {
      this.receta = response.data;
      console.log('Esto es desde el metodo obtener receta', this.receta)
      const nombreTag = this.receta.attributes.tags
      console.log('Esta es la tag', nombreTag)
      console.log('tipo de dato de Tag', typeof(nombreTag))
      // console.log('Este es el valor del tag ')
      this.categoryname = this.receta.attributes.category;
      this.tagName = this.receta.attributes.tags
      this.obtenerCategoriaActual()
      this.obtenerTagActual()

      // Rellenar el formulario con los datos de la receta
      this.recetaForm.setValue({
        title: this.receta.attributes.title,
        description: this.receta.attributes.description,
        ingredients: this.receta.attributes.ingredients,
        instructions: this.receta.attributes.instructions,
        category_id: this.categoryId,
        tags: this.tagId,
        image: this.receta.attributes.image || '', // Si tienes imagen preexistente
      });

      

    });
  }



  //--------------------------------------------------------------------------------------------------------
  obtenerTags() {
    this.recipeService.getTags().subscribe((response) => {
      //console.log('Esta es la lista de tags', response);
      this.listaTags = response.data
      console.log('Lista de tags dentro de data', this.listaTags)

    });
  }


  //------------------------------------------------------------------------------------------------------
  obtenerCategorias() {
    this.recipeService.getAllCategory()?.subscribe(
      response => {
        //console.log('Esta es la lista de Categorias', response);
        this.listaCategorias = response.data;
        console.log('Lista de categorias dentro de data', this.listaCategorias)
      },
    );
  }


  //-----------------------------------------------------------------------------------------------------
  obtenerCategoriaActual() {

    // Buscar la categoría por nombre y obtener el id
    const categoriaEncontrada = this.listaCategorias.find(category => category.attributes.name === this.categoryname);
    if (categoriaEncontrada) {
      this.categoryId = categoriaEncontrada.id;  // Guardamos el id de la categoría
      console.log('ID de la categoría encontrada:', this.categoryId);
    } else {
      console.log('Categoría no encontrada');
    }

  }

  obtenerTagActual() {
    const tagEncontrado = this.listaTags.find(tag => tag.attributes.name === this.tagName );
    console.log('Este es el tipo de dato del id del tagEncontrado',tagEncontrado);
    if(tagEncontrado) {
      this.tagId = tagEncontrado.id
      console.log('ID de la etiquta encontrada: ', this.tagId);
      
    } else {
      console.log('Etiqueta no encontrada');
      
    }
    
  }


  //---------------------------------------------------------------------------------------------------------
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

    this.router.navigate(['']);
  }

  //-------------------------------------------------------------------------------------------------------------------------

  capture(e: any) {
    console.log(e)

  }

  onEdit() {

  }


}





