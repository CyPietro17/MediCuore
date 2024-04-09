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
  ],
})
export class MaterialModule {}
