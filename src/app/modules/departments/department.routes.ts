import { DepartmentComponent } from './components/department/department.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivate } from 'src/app/services/authGuard/auth.guard';

const routes: Routes = [
  { path: '', component: DepartmentComponent, canActivate: [CanActivate] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentRoutes {}
