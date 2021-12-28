import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";

const routes: Routes = [
    {
        path: 'alumno',
        loadChildren: () => import('./modules/alumno/alumno.module').then(m => m.AlumnoModule)
    },
    {
        path: 'curso',
        loadChildren: () => import('./modules/curso/curso.module').then(m => m.CursoModule)
    },
    {
        path: '',
        redirectTo: 'alumno',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }