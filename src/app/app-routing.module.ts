import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { RepartiComponent } from './reparto/reparti/reparti.component';
import { RicoveriComponent } from './ricovero/ricoveri/ricoveri.component';
import { PazientiComponent } from './paziente/pazienti/pazienti.component';
import { ImpiegatiComponent } from './personale/impiegati/impiegati.component';
import { RegisterComponent } from './register/register.component';
import { NewRicoveroComponent } from './ricovero/ricoveri/new-ricovero/new-ricovero.component';
import { RicoveriAttiviComponent } from './ricovero/ricoveri-attivi/ricoveri-attivi.component';
import { NewImpiegatoComponent } from './personale/new-impiegato/new-impiegato.component';
import { RicoveriPazienteComponent } from './ricovero/ricoveri-paziente/ricoveri-paziente.component';
import { RicoveroChiudiComponent } from './ricovero/ricovero-chiudi/ricovero-chiudi.component';
import { ImpiegatiRepartoComponent } from './personale/impiegati-reparto/impiegati-reparto.component';
import { ImpiegatiDimessiComponent } from './personale/impiegati-dimessi/impiegati-dimessi.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reparti', component: RepartiComponent },
  { path: 'ricoveri/attivi', component: RicoveriAttiviComponent },
  { path: 'ricoveri/nuovo', component: NewRicoveroComponent },
  { path: 'ricoveri/chiudi/:id', component: RicoveroChiudiComponent },
  { path: 'ricoveri/paziente/:id', component: RicoveriPazienteComponent },
  { path: 'impiegati', component: ImpiegatiComponent },
  { path: 'impiegati/dimessi', component: ImpiegatiDimessiComponent },
  { path: 'impiegati/nuovo', component: NewImpiegatoComponent },
  { path: 'impiegati/:id', component: ImpiegatiRepartoComponent },
  { path: 'pazienti', component: PazientiComponent },
  { path: 'ricoveri/:id', component: RicoveriComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
