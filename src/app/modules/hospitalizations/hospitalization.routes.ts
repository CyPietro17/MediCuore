import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  HospitalizationComponent,
  RicoveriAttiviComponent,
  RicoveriPazienteComponent,
} from './components';

const routes: Routes = [
  { path: 'attivi', component: RicoveriAttiviComponent },
  { path: 'paziente/:id', component: RicoveriPazienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalizationRoutes {}
