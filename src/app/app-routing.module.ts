import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './core/register/register.component';
import { LoginComponent, ErrorComponent } from './core';
import { CanActivate } from './services/authGuard/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'pazienti',
    loadChildren: () =>
      import('./modules/patients/patient.module').then((m) => m.PatientModule),
    canActivate: [CanActivate],
  },
  {
    path: 'reparti',
    loadChildren: () =>
      import('./modules/departments/department.module').then(
        (m) => m.DepartmentModule
      ),
    canActivate: [CanActivate],
  },
  {
    path: 'ricoveri',
    loadChildren: () =>
      import('./modules/hospitalizations/hospitalization.module').then(
        (m) => m.HospitalizationModule
      ),
    canActivate: [CanActivate],
  },
  {
    path: 'impiegati',
    loadChildren: () =>
      import('./modules/employees/employees.module').then(
        (m) => m.EmployeesModule
      ),
    canActivate: [CanActivate],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
