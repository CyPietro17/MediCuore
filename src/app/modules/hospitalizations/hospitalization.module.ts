import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EndHospitalizationComponent,
  HospitalizationComponent,
  RicoveriAttiviComponent,
  RicoveriPazienteComponent,
  TriageComponent,
} from './components';
import { MaterialModule } from 'src/app/core/modules';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospitalizationRoutes } from './hospitalization.routes';

@NgModule({
  declarations: [
    TriageComponent,
    EndHospitalizationComponent,
    HospitalizationComponent,
    RicoveriAttiviComponent,
    RicoveriPazienteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    HospitalizationRoutes,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TriageComponent,
    EndHospitalizationComponent,
    HospitalizationComponent,
    RicoveriAttiviComponent,
    RicoveriPazienteComponent,
  ],
})
export class HospitalizationModule {}
