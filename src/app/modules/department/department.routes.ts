import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepartiComponent } from './components';
import { IsAdminGuard } from 'src/app/services/authGuard/auth.guard';

const routes: Routes = [
  { path: '', component: RepartiComponent, canActivate: [IsAdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentRoutes {}
