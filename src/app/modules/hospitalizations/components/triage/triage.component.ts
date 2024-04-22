import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Paziente } from 'src/types/Paziente';
import { Reparto } from 'src/types/Reparto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/modules/departments/services/department.service';
import { HospitalizationService } from '../../services/hospitalization.service';
import { PatientService } from 'src/app/modules/patients/services/patient.service';
import { InizioRicoveroRequest } from 'src/types/Ricovero';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-triage',
  templateUrl: './triage.component.html',
  styleUrls: ['./triage.component.css'],
})
export class TriageComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: InizioRicoveroRequest,
    private dialogSheet: MatDialogRef<TriageComponent>,
    private departmentService: DepartmentService,
    private hospitalizationService: HospitalizationService,
    private patientService: PatientService,
    private route: Router
  ) {}

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') == null ||
      (sessionStorage.getItem('role') != 'USER' &&
        sessionStorage.getItem('role') != 'ADMIN')
    ) {
      this.route.navigateByUrl('');
    }
  }

  reparti$: Observable<Reparto[]> = this.departmentService.getReparti();
  pazienti$: Observable<Paziente[]> =
    this.patientService.getPazientiNonRicoverati();

  onClick() {
    this.handleData();
    this.hospitalizationService.nuovoRicovero(this.data).subscribe({
      next: () => {
        this.dialogSheet.close(this.data);
      },
    });
  }

  newRicovero = new FormGroup({
    d_inizioRicovero: new FormControl(new Date(), Validators.required),
    n_paziente: new FormControl(null, Validators.required),
    n_reparto: new FormControl(null, Validators.required),
  });

  get d_inizioRicovero() {
    return this.newRicovero.get('d_inizioRicovero')!.value;
  }

  get n_paziente() {
    return this.newRicovero.get('n_paziente')!.value;
  }

  get n_reparto() {
    return this.newRicovero.get('n_reparto')!.value;
  }

  private handleData(): void {
    this.data.d_inizioRicovero = this.d_inizioRicovero;
    this.data.n_paziente = this.n_paziente;
    this.data.n_reparto = this.n_reparto;
  }
}
