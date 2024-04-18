import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WebService } from '../../services/web.service';
import { Impiegato, ImpiegatoRequest } from 'src/types/Impiegato';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewImpiegatoComponent } from '../new-impiegato/new-impiegato.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-impiegati',
  templateUrl: './impiegati.component.html',
  styleUrls: ['./impiegati.component.css'],
})
export class ImpiegatiComponent implements OnInit {
  constructor(
    private webService: WebService,
    private route: Router,
    private dialog: MatDialog
  ) {}

  form: FormGroup = new FormGroup({
    checked: new FormControl(false),
    t_nome: new FormControl(null),
    t_cognome: new FormControl(null),
    d_dataNascita: new FormControl(null),
    t_codiceFiscale: new FormControl(null),
    t_professione: new FormControl(null),
    n_reparto: new FormControl(null),
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {}

  displayedColumnsAdmin: string[] = [
    'Nome e Cognome',
    'Data di Nascita',
    'Codice Fiscale',
    'Professione',
    'Reparto',
    'Azioni',
  ];

  displayedColumns: string[] = [
    'Nome e Cognome',
    'Data di Nascita',
    'Codice Fiscale',
    'Professione',
    'Reparto',
  ];

  displayedColumnsDimessi: string[] = [
    'Nome e Cognome',
    'Data di Nascita',
    'Codice Fiscale',
    'Professione',
  ];

  dataSource: MatTableDataSource<Impiegato> = new MatTableDataSource<Impiegato>(
    []
  );

  data: ImpiegatoRequest = {
    t_nome: null,
    t_cognome: null,
    d_dataNascita: null,
    t_codiceFiscale: null,
    t_professione: null,
    n_reparto: null,
  };

  /* impDim!: Impiegato[]; */
  // checked: boolean = true;
  admin: boolean = false;
  filter: boolean = false;
  length!: number;
  pageSize = 5;
  pageSizeOptions = [5, 10];
  showFirstLastButtons = true;
  pageIndex = 0;
  t_nome: string = '';
  t_cognome: string = '';
  d_dataNascita!: Date;
  t_professione: string = '';
  n_reparto!: number;

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') == null ||
      (sessionStorage.getItem('role') != 'USER' &&
        sessionStorage.getItem('role') != 'ADMIN')
    ) {
      this.route.navigateByUrl('');
    }
    this.webService.getImpiegatiAssunti().subscribe({
      next: (res) => {
        this.getRole();
        this.length = res.length;
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      },
    });

    this.handleFormChange();
  }

  handleFormChange() {
    this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((val) => {
        if (!this.checked) {
          this.filterImpDimessi(val);
        } else {
          this.filterImp(val);
        }
      });
  }

  getRole(): boolean {
    if (sessionStorage.getItem('role') === 'ADMIN') {
      return (this.admin = true);
    }
    return (this.admin = false);
  }

  add(): void {
    let sheet = this.dialog.open(NewImpiegatoComponent, {
      data: {
        impiegato: {
          t_nome: this.t_nome,
          t_cognome: this.t_cognome,
          d_dataNascita: this.d_dataNascita,
          t_professione: this.t_professione,
          n_reparto: this.n_reparto,
        },
      },
    });

    sheet.afterClosed().subscribe((result) => {
      this.webService.getImpiegatiAssunti().subscribe({
        next: (res) => {
          this.length = res.length;
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
        },
      });
    });
  }

  search(): boolean {
    this.data = {
      t_nome: '',
      t_cognome: '',
      d_dataNascita: null,
      t_codiceFiscale: '',
      t_professione: '',
      n_reparto: null,
    };
    this.cntrlChecked();
    return (this.filter = !this.filter);
  }

  dimettiImp(id: number) {
    this.webService.dimissioniImpiegato(id).subscribe({
      next: () => {
        this.webService.getImpiegatiAssunti().subscribe({
          next: (result) => {
            this.length = result.length;
            this.dataSource.data = result;
            this.dataSource.paginator = this.paginator;
          },
        });
      },
      error: (err) => {
        alert('Dimissioni fallite!');
        console.log(err);
      },
    });
  }

  cntrlChecked() {
    if (this.checked) {
      this.webService.getImpiegatiAssunti().subscribe({
        next: (result) => {
          this.length = result.length;
          this.dataSource.data = result;
          this.dataSource.paginator = this.paginator;
        },
      });
    } else {
      /* this.impDimessi(this.impDim); */
      this.webService.getImpiegatiDimessi().subscribe({
        next: (result) => {
          this.length = result.length;
          this.dataSource.data = result;
          this.dataSource.paginator = this.paginator;
        },
      });
    }
  }

  filterImp(filter: any) {
    this.webService.filterImpiegatiAssunti(filter).subscribe({
      next: (res) => {
        this.length = res.length;
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  filterImpDimessi(filter: any) {
    this.webService.filterImpiegatiDimessi(filter).subscribe({
      next: (res) => {
        this.length = res.length;
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  get checked() {
    return this.form.get('checked')?.value;
  }

  set checked(checked: boolean) {
    this.form.get('checked')?.setValue(checked);
  }

  /* filterImpDimessi(filterDimessi: Impiegato[]) {
    setTimeout(() => {
      this.length = filterDimessi.length;
      this.dataSource.data = filterDimessi;
    }, 1000);
  } */

  /* impDimessi(impiegatiDimessi: Impiegato[]) {
    this.impDim = impiegatiDimessi;
    this.length = impiegatiDimessi.length;
    this.dataSource.data = impiegatiDimessi;
    this.dataSource.paginator = this.paginator;
  } */
}
