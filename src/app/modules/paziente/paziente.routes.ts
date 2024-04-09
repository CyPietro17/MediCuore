import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PazientiComponent } from './components';

const routes: Routes = [{ path: '', component: PazientiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PazienteRoutes {}
