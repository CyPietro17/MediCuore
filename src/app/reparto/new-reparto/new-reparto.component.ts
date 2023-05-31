import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RepartoRequest } from 'src/types/Reparto';

@Component({
  selector: 'app-new-reparto',
  templateUrl: './new-reparto.component.html',
  styleUrls: ['./new-reparto.component.css'],
})
export class NewRepartoComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') == null) {
      this.router.navigateByUrl('');
    } else if (sessionStorage.getItem('role') != 'ADMIN') {
      this.router.navigateByUrl('/error');
    }
  }

  @Output() reparto = new EventEmitter<RepartoRequest>();

  newReparto = new FormGroup({
    t_nome: new FormControl('', Validators.required),
    n_postiLettoEffettivi: new FormControl(1, Validators.required),
  });

  onSubmit() {
    this.reparto.emit(this.prepareRequest());
    this.newReparto.reset();
  }

  prepareRequest(): RepartoRequest {
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
  }
}
