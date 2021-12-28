import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GestionComponent } from './components/gestion/gestion.component';


@NgModule({
  declarations: [
    HomeComponent,
    GestionComponent
  ],
  imports: [
    SharedModule,
    AlumnoRoutingModule
  ]
})
export class AlumnoModule { }
