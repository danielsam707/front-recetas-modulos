import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { PruebaComponent } from './prueba/prueba.component';
import { DetalleRecetaComponent } from './detalle-receta/detalle-receta.component';
import { FomularioComponent } from './fomulario/fomulario.component';
import { RecetaDosComponent } from './component/receta-dos/receta-dos.component';
import { ListaDosComponent } from './component/lista-dos/lista-dos.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'detalle-receta/:id',
        component: DetalleRecetaComponent
      },
      {
        path: 'formulario',
        component: FomularioComponent
      },
      {
        path: 'formulario/:id',
        component: FomularioComponent
      },
      {
        path: 'receta-api',
        component: RecetaDosComponent
      },
      {
        path: 'lista-api',
        component: ListaDosComponent
      },

    
    ]
    
  }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
