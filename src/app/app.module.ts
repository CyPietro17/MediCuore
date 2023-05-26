import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { RepartiComponent } from './reparti/reparti.component';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewRepartoComponent } from './new-reparto/new-reparto.component';
import { PazientiComponent } from './pazienti/pazienti.component';
import { RicoveriComponent } from './ricoveri/ricoveri.component';
import { NewPazienteComponent } from './new-paziente/new-paziente.component';
import { ImpiegatiComponent } from './impiegati/impiegati.component';
import { NewImpiegatoComponent } from './new-impiegato/new-impiegato.component';
import { ImpiegatiRepartoComponent } from './impiegati-reparto/impiegati-reparto.component';
import { RegisterComponent } from './register/register.component';
import { NewRicoveroComponent } from './new-ricovero/new-ricovero.component';
import { RicoveriAttiviComponent } from './ricoveri-attivi/ricoveri-attivi.component';
import { RicoveriPazienteComponent } from './ricoveri-paziente/ricoveri-paziente.component';
import { InterceptService } from './services/intercept.service';
import { RicoveroChiudiComponent } from './ricovero-chiudi/ricovero-chiudi.component';

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
