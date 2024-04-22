import { Component, OnInit } from '@angular/core';
import { Ricovero } from 'src/types/Ricovero';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Reparto } from 'src/types/Reparto';
import { DepartmentService } from 'src/app/modules/departments/services/department.service';
import { HospitalizationService } from '../../services/hospitalization.service';

@Component({
  selector: 'app-hospitalization',
  templateUrl: './hospitalization.component.html',
  styleUrls: ['./hospitalization.component.css'],
})
export class HospitalizationComponent implements OnInit {
  constructor(
    private departmentService: DepartmentService,
    private hospitalizationService: HospitalizationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ricoveri$!: Observable<Ricovero[]>;

  id: number = this.route.snapshot.params['id'];

  reparto$!: Reparto;

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') == null ||
      (sessionStorage.getItem('role') != 'USER' &&
        sessionStorage.getItem('role') != 'ADMIN')
    ) {
      this.router.navigateByUrl('');
    }
    this.ricoveri$ = this.hospitalizationService.getRicoveriReparto(this.id);
    this.departmentService.getReparto(this.id).subscribe({
      next: (res) => {
        this.reparto$ = res;
      },
      error: (err) => {
        alert('Risorse non trovate! Cambiare pagina.');
      },
    });
  }

  add() {
    this.router.navigate(['ricoveri/nuovo']);
  }
}
