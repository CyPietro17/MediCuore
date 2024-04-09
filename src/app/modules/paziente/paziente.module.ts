import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PazientiComponent, NewPazienteComponent } from './components';
import { MaterialModule } from 'src/app/core/modules';
import { CoreModule } from 'src/app/core/core.module';
import { PazienteRoutes } from './paziente.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PazientiComponent, NewPazienteComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    PazienteRoutes,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [PazientiComponent, NewPazienteComponent],
})
export class PazienteModule {}
