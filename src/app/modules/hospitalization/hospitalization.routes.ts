import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  EndHospitalizationComponent,
  HospitalizationComponent,
  RicoveriAttiviComponent,
  RicoveriPazienteComponent,
} from './components';

const routes: Routes = [
  { path: '', component: HospitalizationComponent },
  { path: 'attivi', component: RicoveriAttiviComponent },
  { path: 'ricoveri/chiudi/:id', component: EndHospitalizationComponent },
  { path: 'ricoveri/paziente/:id', component: RicoveriPazienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalizationRoutes {}
