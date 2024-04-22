import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PazientiComponent } from './components';
import { CanActivate } from 'src/app/services/authGuard/auth.guard';

const routes: Routes = [
  { path: '', component: PazientiComponent, canActivate: [CanActivate] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PazienteRoutes {}
