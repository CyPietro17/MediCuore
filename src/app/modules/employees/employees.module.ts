import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EmployeesComponent,
  ImpiegatiDimessiComponent,
  ImpiegatiRepartoComponent,
  NewEmployeesComponent,
  SearchComponent,
} from './components';
import { MaterialModule } from 'src/app/core/modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { EmployeesRoutes } from './employees.routes';

@NgModule({
  declarations: [
    EmployeesComponent,
    NewEmployeesComponent,
    SearchComponent,
    ImpiegatiDimessiComponent,
    ImpiegatiRepartoComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    EmployeesRoutes,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    EmployeesComponent,
    NewEmployeesComponent,
    SearchComponent,
    ImpiegatiDimessiComponent,
    ImpiegatiRepartoComponent,
  ],
})
export class EmployeesModule {}
