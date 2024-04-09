import { FineRicoveroRequest, Ricovero } from 'src/types/Ricovero';
import { WebService } from '../../services/web.service';
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewRicoveroComponent } from '../new-ricovero/new-ricovero.component';

@Component({
  selector: 'app-ricoveri-attivi',
  templateUrl: './ricoveri-attivi.component.html',
  styleUrls: ['./ricoveri-attivi.component.css'],
})
export class RicoveriAttiviComponent {
  constructor(
    private webService: WebService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  bool: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  dataSource: MatTableDataSource<Ricovero> = new MatTableDataSource<Ricovero>(
    []
  );

  length!: number;
  pageSize = 5;
  pageSizeOptions = [5, 10];
  showFirstLastButtons = true;
  pageIndex = 0;
  d_inizioRicovero!: Date;
  n_paziente!: number;
  n_reparto!: number;

  displayedColumns: string[] = [
    'Nome Paziente',
    'CF Paziente',
    'Inizio Ricovero',
    'Reparto',
    'Azioni',
  ];

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') == null ||
      (sessionStorage.getItem('role') != 'USER' &&
        sessionStorage.getItem('role') != 'ADMIN')
    ) {
      this.router.navigateByUrl('');
    }
    this.webService.getRicoveriAttivi().subscribe({
      next: (res) => {
        this.length = res.length;
        this.dataSource.data = res;
      },
    });
  }

  add(): void {
    let sheet = this.dialog.open(NewRicoveroComponent, {
      data: {
        ricovero: {
          d_inizioRicovero: this.d_inizioRicovero,
          n_paziente: this.n_paziente,
          n_reparto: this.n_reparto,
        },
      },
    });
    sheet.afterClosed().subscribe((result) => {
      this.webService.getRicoveriAttivi().subscribe({
        next: (res) => {
          this.length = res.length;
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
        },
      });
    });
  }
}
