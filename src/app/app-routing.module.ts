import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { RepartiComponent } from './reparti/reparti.component';
import { RicoveriComponent } from './ricoveri/ricoveri.component';
import { PazientiComponent } from './pazienti/pazienti.component';
import { ImpiegatiComponent } from './impiegati/impiegati.component';
import { ImpiegatiRepartoComponent } from './impiegati-reparto/impiegati-reparto.component';
import { RegisterComponent } from './register/register.component';
import { NewRicoveroComponent } from './new-ricovero/new-ricovero.component';
import { RicoveriAttiviComponent } from './ricoveri-attivi/ricoveri-attivi.component';
import { NewImpiegatoComponent } from './new-impiegato/new-impiegato.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reparti', component: RepartiComponent },
  /* { path: 'ricoveri/paziente/:id', component: RicoveriPazientenComponent }, */
  { path: 'ricoveri/attivi', component: RicoveriAttiviComponent },
  { path: 'ricoveri/nuovo', component: NewRicoveroComponent },
  { path: 'impiegati', component: ImpiegatiComponent },
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
