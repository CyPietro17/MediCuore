import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent, ImpiegatiRepartoComponent } from './components';
import { CanActivate } from 'src/app/services/authGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
  },
  // canActivate: [CanActivate],
  // canActivateChild: [CanActivate],
  { path: 'reparto/:id', component: ImpiegatiRepartoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutes {}
