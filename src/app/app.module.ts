import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { RepartiComponent } from './reparto/reparti/reparti.component';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewRepartoComponent } from './reparto/new-reparto/new-reparto.component';
import { PazientiComponent } from './paziente/pazienti/pazienti.component';
import { NewPazienteComponent } from './paziente/new-paziente/new-paziente.component';
import { ImpiegatiComponent } from './personale/impiegati/impiegati.component';
import { NewImpiegatoComponent } from './personale/new-impiegato/new-impiegato.component';
import { RegisterComponent } from './register/register.component';
import { NewRicoveroComponent } from './ricovero/ricoveri/new-ricovero/new-ricovero.component';
import { RicoveriAttiviComponent } from './ricovero/ricoveri-attivi/ricoveri-attivi.component';
import { RicoveriPazienteComponent } from './ricovero/ricoveri-paziente/ricoveri-paziente.component';
import { InterceptService } from './services/intercept.service';
import { RicoveroChiudiComponent } from './ricovero/ricovero-chiudi/ricovero-chiudi.component';
import { ImpiegatiRepartoComponent } from './personale/impiegati-reparto/impiegati-reparto.component';
import { RicoveriComponent } from './ricovero/ricoveri/ricoveri.component';
import { ImpiegatiDimessiComponent } from './personale/impiegati-dimessi/impiegati-dimessi.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    RepartiComponent,
    NewRepartoComponent,
    PazientiComponent,
    RicoveriComponent,
    NewPazienteComponent,
    ImpiegatiComponent,
    NewImpiegatoComponent,
    ImpiegatiRepartoComponent,
    RegisterComponent,
    NewRicoveroComponent,
    RicoveriAttiviComponent,
    RicoveriPazienteComponent,
    RicoveroChiudiComponent,
    ImpiegatiDimessiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
