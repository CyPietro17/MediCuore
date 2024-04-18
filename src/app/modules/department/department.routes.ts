import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepartiComponent } from './components';

const routes: Routes = [{ path: '', component: RepartiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentRoutes {}
