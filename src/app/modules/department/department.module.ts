import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/modules';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewRepartoComponent, RepartiComponent } from './components';
import { DepartmentRoutes } from './department.routes';

@NgModule({
  declarations: [NewRepartoComponent, RepartiComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    DepartmentRoutes,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RepartiComponent, NewRepartoComponent],
})
export class DepartmentModule {}
