import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/modules';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentComponent, NewDepartmentComponent } from './components';
import { DepartmentRoutes } from './department.routes';

@NgModule({
  declarations: [NewDepartmentComponent, DepartmentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    DepartmentRoutes,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [NewDepartmentComponent, DepartmentComponent],
})
export class DepartmentModule {}
