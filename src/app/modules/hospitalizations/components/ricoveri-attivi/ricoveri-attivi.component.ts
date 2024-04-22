import { Observable } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HospitalizationService } from '../../services/hospitalization.service';
import { TriageComponent } from '../triage/triage.component';
import { EndHospitalizationComponent } from '../endHospitalization/endHospitalization.component';
import { Ricovero } from 'src/types/Ricovero';

@Component({
  selector: 'app-ricoveri-attivi',
  templateUrl: './ricoveri-attivi.component.html',
  styleUrls: ['./ricoveri-attivi.component.css'],
})
export class RicoveriAttiviComponent {
  constructor(
    private webService: HospitalizationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  bool: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  // }

  dataSource: MatTableDataSource<Ricovero> = new MatTableDataSource<Ricovero>(
    []
  );

  private hospitalization!: Ricovero;
  length!: number;
  pageSize = 5;
  pageSizeOptions = [5, 10];
  showFirstLastButtons = true;
  pageIndex = 0;
  d_inizioRicovero!: Date;
  d_fineRicovero!: Date;
  n_paziente!: number;
  n_reparto!: number;

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') == null ||
      (sessionStorage.getItem('role') != 'USER' &&
        sessionStorage.getItem('role') != 'ADMIN')
    ) {
      this.router.navigateByUrl('');
    }
    this.getActiveHospitalizations();
  }

  private getActiveHospitalizations(): void {
    this.webService.getRicoveriAttivi().subscribe({
      next: (res) => {
        this.length = res.length;
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  displayedColumns: string[] = [
    'Nome Paziente',
    'CF Paziente',
    'Inizio Ricovero',
    'Reparto',
    'Azioni',
  ];

  private getHospitalization(id: number): void {
    let observable: Observable<Ricovero> = this.webService.cercaRicovero(id);
    observable.subscribe({
      next: (res) => {
        this.hospitalization = res;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.openDialog(this.hospitalization);
      },
    });
  }

  add(): void {
    let sheet = this.dialog.open(TriageComponent, {
      data: {
        ricovero: {
          d_inizioRicovero: this.d_inizioRicovero,
          n_paziente: this.n_paziente,
          n_reparto: this.n_reparto,
        },
      },
    });
    sheet.afterClosed().subscribe(() => {
      this.getActiveHospitalizations();
    });
  }

  end(id: number) {
    this.getHospitalization(id);
  }

  private openDialog(response: Ricovero): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ...response,
    };
    let sheet = this.dialog.open(EndHospitalizationComponent, dialogConfig);
    sheet.afterClosed().subscribe(() => {
      this.getActiveHospitalizations();
    });
  }
}
