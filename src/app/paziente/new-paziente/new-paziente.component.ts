import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PazienteRequest } from 'src/types/Paziente';

@Component({
  selector: 'app-new-paziente',
  templateUrl: './new-paziente.component.html',
  styleUrls: ['./new-paziente.component.css'],
})
export class NewPazienteComponent implements OnInit {
  constructor(private route: Router) {}

  @Output() paziente = new EventEmitter<PazienteRequest>();

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') == null ||
      (sessionStorage.getItem('role') != 'USER' &&
        sessionStorage.getItem('role') != 'ADMIN')
    ) {
      this.route.navigateByUrl('');
    }
  }

  newPaziente = new FormGroup({
    t_nome: new FormControl('', Validators.required),
    t_cognome: new FormControl('', Validators.required),
    d_dataNascita: new FormControl(new Date(), Validators.required),
  });

  onSubmit() {
    console.log(this.prepareRequest());
    this.paziente.emit(this.prepareRequest());
    this.newPaziente.reset();
  }

  prepareRequest(): PazienteRequest {
    return {
      t_nome: this.t_nome,
      t_cognome: this.t_cognome,
      d_dataNascita: this.d_dataNascita,
    };
  }

  get t_nome() {
    return this.newPaziente.get('t_nome')!.value;
  }

  get t_cognome() {
    return this.newPaziente.get('t_cognome')!.value;
  }

  get d_dataNascita() {
    return this.newPaziente.get('d_dataNascita')!.value;
  }
}
