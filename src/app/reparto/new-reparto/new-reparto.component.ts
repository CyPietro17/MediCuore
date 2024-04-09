import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RepartoRequest } from 'src/types/Reparto';
import { HttpClient } from '@angular/common/http';
import { WebService } from 'src/app/services/web.service';

@Component({
  selector: 'app-new-reparto',
  templateUrl: './new-reparto.component.html',
  styleUrls: ['./new-reparto.component.css'],
})
export class NewRepartoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RepartoRequest,
    private router: Router,
    private bottomSheet: MatDialogRef<NewRepartoComponent>,
    private webService: WebService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') == null) {
      this.router.navigateByUrl('');
    } else if (sessionStorage.getItem('role') != 'ADMIN') {
      this.router.navigateByUrl('/error');
    }
  }

  onClick() {
    this.webService.nuovoReparto(this.data).subscribe({
      next: () => {
        this.bottomSheet.close(this.data);
      },
    });
  }

  /* @Output() reparto = new EventEmitter<RepartoRequest>();

  newReparto = new FormGroup({
    t_nome: new FormControl('', Validators.required),
    n_postiLettoEffettivi: new FormControl(1, Validators.required),
  }); */

  /* onSubmit(event: MouseEvent) {
    this.bottomSheet.close(this.data);
    event.preventDefault();
  } */

  /* prepareRequest(): RepartoRequest {
    return {
      t_nome: this.t_nome,
      n_postiLettoEffettivi: this.n_postiLettoEffettivi,
    };
  }

  get t_nome() {
    return this.newReparto.get('t_nome')?.value;
  }

  get n_postiLettoEffettivi() {
    return this.newReparto.get('n_postiLettoEffettivi')?.value;
  } */
}
