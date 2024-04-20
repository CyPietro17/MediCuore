import { WebService } from 'src/app/services/web.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ImpiegatoRequest } from 'src/types/Impiegato';
import { Reparto } from 'src/types/Reparto';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/modules/department/services/department.service';

@Component({
  selector: 'app-new-employees',
  templateUrl: './new-employees.component.html',
  styleUrls: ['./new-employees.component.css'],
})
export class NewEmployeesComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ImpiegatoRequest,
    private dialogRef: MatDialogRef<NewEmployeesComponent>,
    private departmentService: DepartmentService,
    private webService: WebService,
    private route: Router
  ) {}

  reparti$: Observable<Reparto[]> = this.departmentService.getReparti();

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') == null &&
      sessionStorage.getItem('role') != 'ADMIN'
    ) {
      this.route.navigateByUrl('/error');
    }
  }

  onClick() {
    this.webService.nuovoImpiegato(this.data).subscribe({
      next: () => {
        this.dialogRef.close(this.data);
      },
    });
  }

  /* newImpiegato = new FormGroup({
    t_nome: new FormControl('', Validators.required),
    t_cognome: new FormControl('', Validators.required),
    d_dataNascita: new FormControl(new Date(), Validators.required),
    t_professione: new FormControl('', Validators.required),
    n_reparto: new FormControl(0, Validators.required),
  });

  onSubmit() {
    this.webService.nuovoImpiegato(this.prepareRequest()).subscribe({
      next: () => {
        this.webService.getImpiegatiAssunti();
        this.route.navigate(['/impiegati']);
      },
      error: () => {
        console.log('Impossibile aggiungere Impiegato');
      },
    });
  }

  prepareRequest(): ImpiegatoRequest {
    return {
      t_nome: this.t_nome,
      t_cognome: this.t_cognome,
      d_dataNascita: this.d_dataNascita,
      t_professione: this.t_professione,
      n_reparto: this.n_reparto,
    };
  }

  get t_nome() {
    return this.newImpiegato.get('t_nome')!.value;
  }

  get t_cognome() {
    return this.newImpiegato.get('t_cognome')!.value;
  }

  get d_dataNascita() {
    return this.newImpiegato.get('d_dataNascita')!.value;
  }

  get t_professione() {
    return this.newImpiegato.get('t_professione')!.value;
  }

  get n_reparto() {
    return this.newImpiegato.get('n_reparto')!.value;
  } */
}
