import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { DepartmentComponent, NewDepartmentComponent } from './components';
import { DepartmentRoutes } from './department.routes';
import { MaterialModule } from 'src/app/core/modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewDepartmentComponent, DepartmentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    DepartmentRoutes,
  ],
  exports: [NewDepartmentComponent, DepartmentComponent],
})
export class DepartmentModule {}
