import { Reparto } from '../../../../../types/Reparto';
import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewDepartmentComponent } from '../new-department/new-department.component';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-reparti',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit, AfterViewInit {
  constructor(
    private webService: DepartmentService,
    private route: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    'Nome Reparto',
    'Posti Letto',
    'Posti Disponibili',
    'Disponibilità',
    'Azioni',
  ];

  dataSource: MatTableDataSource<Reparto> = new MatTableDataSource<Reparto>([]);
  admin: boolean = false;
  aggiungi: boolean = false;
  length!: number;
  pageSize = 5;
  pageSizeOptions = [5, 10];
  showFirstLastButtons = true;
  pageIndex = 0;
  t_nome: string = '';
  n_postiLetto: number = 0;

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') == null ||
      (sessionStorage.getItem('role') != 'USER' &&
        sessionStorage.getItem('role') != 'ADMIN')
    ) {
      this.route.navigateByUrl('');
    }
    this.webService.getReparti().subscribe({
      next: (res) => {
        this.length = res.length;
        this.getRole();
        this.dataSource.data = res;
      },
      error: () => {
        this.route.navigateByUrl('/login');
      },
    });
  }

  add(): void {
    let sheet = this.dialog.open(NewDepartmentComponent, {
      data: {
        reparto: {
          t_nome: this.t_nome,
          n_postiLetto: this.n_postiLetto,
        },
      },
    });
    sheet.afterClosed().subscribe((result) => {
      this.webService.getReparti().subscribe({
        next: (res) => {
          this.length = res.length;
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
        },
      });
    });
  }

  getRole(): boolean {
    if (sessionStorage.getItem('role') === 'ADMIN') {
      return (this.admin = true);
    }
    return (this.admin = false);
  }
}
