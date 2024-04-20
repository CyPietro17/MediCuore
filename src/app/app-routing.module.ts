import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './core/register/register.component';
import { LoginComponent, ErrorComponent } from './core';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
  {
    path: 'impiegati',
    loadChildren: () =>
      import('./modules/employees/employees.module').then(
        (m) => m.EmployeesModule
      ),
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
