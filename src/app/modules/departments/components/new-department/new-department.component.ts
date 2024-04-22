import { DepartmentService } from '../../services/department.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepartoRequest } from 'src/types/Reparto';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CanActivateChild } from 'src/app/services/authGuard/auth.guard';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.css'],
})
export class NewDepartmentComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Subject<RepartoRequest>,
    private router: Router,
    private bottomSheet: MatDialogRef<NewDepartmentComponent>,
    private webService: DepartmentService,
    private spinner: NgxSpinnerService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    if (![CanActivateChild]) {
      this.router.navigateByUrl('/error');
    }
  }

  onClick() {
    let request = this.handleRequest();
    this.webService.nuovoReparto(request).subscribe({
      next: () => {
        this.spinner.show();
        setTimeout(() => {
          this.toast.info({
            detail: 'NEW DEPARTMENT',
            summary:
              request.t_nome + ' : ' + request.n_postiLettoEffettivi + ' beds',
            duration: 5000,
          });
          this.spinner.hide();
        }, 1500);
        this.bottomSheet.close(this.data);
      },
    });
  }

  private handleRequest(): RepartoRequest {
    let request!: RepartoRequest;
    this.data.subscribe({
      next: (res) => {
        res.t_nome = this.t_nome;
        res.n_postiLettoEffettivi = this.n_postiLettoEffettivi;
        request = res;
      },
    });
    return request;
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
