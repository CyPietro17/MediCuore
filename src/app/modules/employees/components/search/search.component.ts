import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { WebService } from 'src/app/services/web.service';
import { Impiegato } from 'src/types/Impiegato';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(private webService: WebService) {}

  @Input() check: boolean = false;
  @Output() responseEvent = new EventEmitter<Observable<Impiegato[]>>();

  handleFormChange() {
    this.form.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((val) => {
        if (!this.check) {
          this.filterImp(val);
        } else {
          this.filterImpDimessi(val);
        }
      });
  }

  form: FormGroup = new FormGroup({
    checked: new FormControl(false),
    t_nome: new FormControl(null),
    t_cognome: new FormControl(null),
    d_dataNascita: new FormControl(null),
    t_codiceFiscale: new FormControl(null),
    t_professione: new FormControl(null),
    n_reparto: new FormControl(null),
  });

  filterImp(filter: any) {
    this.responseEvent.emit(this.webService.filterImpiegatiAssunti(filter));
  }

  filterImpDimessi(filter: any) {
    this.responseEvent.emit(this.webService.filterImpiegatiDimessi(filter));
  }
}
