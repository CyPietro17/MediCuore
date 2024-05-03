import { DepartmentService } from '../../services/department.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { RepartoRequest } from 'src/types/Reparto';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.css'],
})
export class NewDepartmentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RepartoRequest,
    private bottomSheet: MatDialogRef<NewDepartmentComponent>,
    private webService: DepartmentService,
    private toast: NgToastService
  ) {}

  onClick() {
    this.handleRequest();
    this.webService.nuovoReparto(this.data).subscribe({
      next: () => {
        this.toast.info({
          detail: 'NEW DEPARTMENT',
          summary:
            this.data.t_nome +
            ' : ' +
            this.data.n_postiLettoEffettivi +
            ' beds',
          duration: 5000,
        });
      },
      error: () => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Something was wrong!',
          duration: 5000,
        });
      },
      complete: () => {
        this.bottomSheet.close(this.data);
      },
    });
  }

  private handleRequest(): void {
    this.data.t_nome = this.t_nome;
    this.data.n_postiLettoEffettivi = this.n_postiLettoEffettivi;
  }

  RequestDepartment = new FormGroup({
    t_nome: new FormControl(null, Validators.required),
    n_postiLettoEffettivi: new FormControl(null, Validators.required),
  });

  get t_nome() {
    return this.RequestDepartment.get('t_nome')?.value;
  }

  get n_postiLettoEffettivi() {
    return this.RequestDepartment.get('n_postiLettoEffettivi')?.value;
  }
}
