import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [],
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    /*     {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }, */
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
  ],
})
export class MaterialModule {}
