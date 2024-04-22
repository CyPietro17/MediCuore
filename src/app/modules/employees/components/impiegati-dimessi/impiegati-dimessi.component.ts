import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Impiegato } from 'src/types/Impiegato';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-impiegati-dimessi',
  templateUrl: './impiegati-dimessi.component.html',
  styleUrls: ['./impiegati-dimessi.component.css'],
})
export class ImpiegatiDimessiComponent implements OnInit {
  constructor(private webService: EmployeesService, private route: Router) {}

  @Output() dimessi$ = new EventEmitter<Impiegato[]>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  dataSource: MatTableDataSource<Impiegato> = new MatTableDataSource<Impiegato>(
    []
  );

  displayedColumnsDimessi: string[] = [
    'Nome e Cognome',
    'Data di Nascita',
    'Codice Fiscale',
    'Professione',
  ];

  length!: number;
  pageSize = 5;
  pageSizeOptions = [5, 10];
  showFirstLastButtons = true;
  pageIndex = 0;

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') != null &&
      sessionStorage.getItem('role') === 'ADMIN'
    ) {
      this.webService.getImpiegatiDimessi().subscribe({
        next: (res) => {
          this.length = res.length;
          this.dataSource.data = res;
          this.dimessi$.emit(res);
        },
      });
    } else {
      this.route.navigateByUrl('/error');
    }
  }
}
