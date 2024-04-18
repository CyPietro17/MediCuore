import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpiegatiComponent } from './personale/impiegati/impiegati.component';
import { RegisterComponent } from './core/register/register.component';
import { NewImpiegatoComponent } from './personale/new-impiegato/new-impiegato.component';
import { ImpiegatiRepartoComponent } from './personale/impiegati-reparto/impiegati-reparto.component';
import { ImpiegatiDimessiComponent } from './personale/impiegati-dimessi/impiegati-dimessi.component';
import { LoginComponent, ErrorComponent } from './core';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'impiegati', component: ImpiegatiComponent },
  { path: 'impiegati/dimessi', component: ImpiegatiDimessiComponent },
  { path: 'impiegati/nuovo', component: NewImpiegatoComponent },
  { path: 'impiegati/:id', component: ImpiegatiRepartoComponent },
  {
    path: 'pazienti',
    loadChildren: () =>
      import('./modules/paziente/patient.module').then((m) => m.PatientModule),
  },
  {
    path: 'reparti',
    loadChildren: () =>
      import('./modules/department/department.module').then(
        (m) => m.DepartmentModule
      ),
  },
  {
    path: 'ricoveri',
    loadChildren: () =>
      import('./modules/hospitalization/hospitalization.module').then(
        (m) => m.HospitalizationModule
      ),
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
