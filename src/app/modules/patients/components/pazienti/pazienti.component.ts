import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paziente } from 'src/types/Paziente';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NewPazienteComponent } from '../new-paziente/new-paziente.component';
import { PatientService } from '../../services/patient.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pazienti',
  templateUrl: './pazienti.component.html',
  styleUrls: ['./pazienti.component.css'],
})
export class PazientiComponent implements OnInit {
  constructor(
    private webService: PatientService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  dataSource: MatTableDataSource<Paziente> = new MatTableDataSource<Paziente>(
    []
  );

  filter: boolean = false;
  length!: number;
  pageSize = 5;
  pageSizeOptions = [5, 10];
  showFirstLastButtons = true;
  pageIndex = 0;
  t_nome!: string;
  t_cognome!: string;
  d_dataNascita!: Date;

  aggiungi: boolean = false;

  id: number = this.route.snapshot.params['id'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    'Nome e Cognome',
    'Data di Nascita',
    'Codice Fiscale',
    'Attualmente Ricoverato',
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
    this.webService.getPazienti().subscribe({
      next: (res) => {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        this.length = res.length;
        this.dataSource.data = res;
      },
    });
  }

  add(): void {
    let sheet = this.dialog.open(NewPazienteComponent, {
      data: {
        impiegato: {
          t_nome: this.t_nome,
          t_cognome: this.t_cognome,
          d_dataNascita: this.d_dataNascita,
        },
      },
    });

    sheet.afterClosed().subscribe((result) => {
      this.webService.getPazienti().subscribe({
        next: (res) => {
          this.length = res.length;
          this.dataSource.data = res;
        },
      });
    });
  }

  search(): boolean {
    return (this.filter = !this.filter);
  }
}
