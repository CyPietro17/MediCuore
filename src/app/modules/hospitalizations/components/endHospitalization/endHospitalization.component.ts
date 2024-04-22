import { DepartmentService } from 'src/app/modules/departments/services/department.service';
import { HospitalizationService } from './../../services/hospitalization.service';
import { FineRicoveroRequest } from './../../../../../types/Ricovero';
import { Component, Inject, OnInit } from '@angular/core';
import { Ricovero } from 'src/types/Ricovero';
import { Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/modules/patients/services/patient.service';
import { NgToastService } from 'ng-angular-popup';
import { Paziente } from 'src/types/Paziente';

@Component({
  selector: 'app-endHospitalization',
  templateUrl: './endHospitalization.component.html',
  styleUrls: ['./endHospitalization.component.css'],
})
export class EndHospitalizationComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Ricovero,
    @Inject(MAT_DIALOG_DATA) public request: FineRicoveroRequest,
    private dialogSheet: MatDialogRef<MatDialogConfig>,
    private hospitalizationService: HospitalizationService,
    private patientService: PatientService,
    private departmentService: DepartmentService,
    private toastsService: NgToastService,
    private router: Router
  ) {}

  patient?: Paziente;

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') == null ||
      (sessionStorage.getItem('role') != 'USER' &&
        sessionStorage.getItem('role') != 'ADMIN')
    ) {
      this.router.navigateByUrl('');
    }
    this.getPatient(this.data.n_paziente.n_id);
    this.getDepartment(this.data.t_reparto.n_id);
  }

  private getPatient(id_patient: number): void {
    this.patientService.paziente(id_patient).subscribe({
      next: (res) => {
        this.patient = res;
        this.closeForm
          .get('n_paziente')
          ?.setValue(res.t_nome.concat(' ', res.t_cognome));
        this.closeForm.get('n_paziente')?.disable();
        this.closeForm.get('t_codiceFiscale')?.setValue(res.t_codiceFiscale);
        this.closeForm.get('t_codiceFiscale')?.disable();
        this.closeForm
          .get('d_inizioRicovero')
          ?.setValue(new Date(this.data.d_inizioRicovero));
        this.closeForm.get('d_inizioRicovero')?.disable();
      },
    });
  }

  private getDepartment(id_department: number): void {
    this.departmentService.getReparto(id_department).subscribe({
      next: (res) => {
        this.closeForm.get('n_reparto')?.setValue(res.n_id);
        this.closeForm.get('n_reparto')?.disable();
      },
    });
  }

  onClick() {
    this.handleData();
    this.hospitalizationService.chiudiRicovero(this.request).subscribe({
      next: () => {
        this.toastsService.info({
          detail: 'INFO SEVICE',
          summary:
            this.patient?.t_cognome +
            ' ' +
            this.patient?.t_nome +
            "'s hospitalization end",
          duration: 5000,
        });
        this.dialogSheet.close(this.request);
      },
      error: () => {
        this.toastsService.error({
          detail: 'ERROR',
          summary: 'Please insert the correct data',
          duration: 5000,
        });
      },
    });
  }

  private handleData(): void {
    this.request.d_fineRicovero = this.d_fineRicovero;
    this.request.n_paziente = this.data.n_paziente.n_id;
    this.request.n_reparto = this.n_reparto;
  }

  closeForm: FormGroup = new FormGroup({
    d_fineRicovero: new FormControl(new Date(), Validators.required),
    d_inizioRicovero: new FormControl(new Date()),
    n_paziente: new FormControl(null),
    n_reparto: new FormControl(null),
    t_codiceFiscale: new FormControl(null),
  });

  get d_fineRicovero() {
    return this.closeForm.get('d_fineRicovero')?.value;
  }

  get n_paziente() {
    return this.closeForm.get('n_paziente')?.value;
  }

  get n_reparto() {
    return this.closeForm.get('n_reparto')?.value;
  }

  get t_codiceFiscale() {
    return this.closeForm.get('t_codiceFiscale')?.value;
  }

  get d_inizioRicovero() {
    return this.closeForm.get('d_inizioRicovero')?.value;
  }
}
