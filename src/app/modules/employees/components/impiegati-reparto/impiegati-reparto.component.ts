import { Component, OnInit, ViewChild } from '@angular/core';
import { Impiegato } from 'src/types/Impiegato';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/modules/departments/services/department.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-impiegati-reparto',
  templateUrl: './impiegati-reparto.component.html',
  styleUrls: ['./impiegati-reparto.component.css'],
})
export class ImpiegatiRepartoComponent implements OnInit {
  constructor(
    private departmentService: DepartmentService,
    private webService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'Nome e Cognome',
    'Data di Nascita',
    'Codice Fiscale',
    'Professione',
  ];

  dataSource: MatTableDataSource<Impiegato> = new MatTableDataSource<Impiegato>(
    []
  );

  admin!: boolean;
  id: number = this.route.snapshot.params['id'];

  departmentName!: string;

  length!: number;
  pageSize = 5;
  pageSizeOptions = [5, 10];
  showFirstLastButtons = true;
  pageIndex = 0;

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') == null ||
      (sessionStorage.getItem('role') != 'USER' &&
        sessionStorage.getItem('role') != 'ADMIN')
    ) {
      this.router.navigateByUrl('');
    }
    this.getResponseEmployees(this.id);
    this.getDepartment(this.id);
  }

  private getResponseEmployees(departmentID: number) {
    this.webService.getImpiegatiReparto(this.id).subscribe({
      next: (res) => {
        this.length = res.length;
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  private getDepartment(departmentID: number) {
    this.departmentService.getReparto(this.id).subscribe({
      next: (res) => {
        this.departmentName = res.t_nome.toUpperCase();
      },
    });
  }
}
