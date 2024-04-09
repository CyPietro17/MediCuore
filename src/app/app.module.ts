import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepartiComponent } from './reparto/reparti/reparti.component';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewRepartoComponent } from './reparto/new-reparto/new-reparto.component';
import { ImpiegatiComponent } from './personale/impiegati/impiegati.component';
import { NewImpiegatoComponent } from './personale/new-impiegato/new-impiegato.component';
import { RegisterComponent } from './register/register.component';
import { NewRicoveroComponent } from './ricovero/new-ricovero/new-ricovero.component';
import { RicoveriAttiviComponent } from './ricovero/ricoveri-attivi/ricoveri-attivi.component';
import { RicoveriPazienteComponent } from './ricovero/ricoveri-paziente/ricoveri-paziente.component';
import { InterceptService } from './services/intercept.service';
import { RicoveroChiudiComponent } from './ricovero/ricovero-chiudi/ricovero-chiudi.component';
import { ImpiegatiRepartoComponent } from './personale/impiegati-reparto/impiegati-reparto.component';
import { RicoveriComponent } from './ricovero/ricoveri/ricoveri.component';
import { ImpiegatiDimessiComponent } from './personale/impiegati-dimessi/impiegati-dimessi.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RicercaImpiegatiDimessiComponent } from './personale/ricerca/dimessi/ricerca-impiegati-dimessi/ricerca-impiegati-dimessi.component';
import { RicercaImpiegatiAssuntiComponent } from './personale/ricerca/assunti/ricerca-impiegati-assunti/ricerca-impiegati-assunti.component';
import { MaterialModule } from './core/modules';

@NgModule({
  declarations: [
    AppComponent,
    RepartiComponent,
    NewRepartoComponent,
    RicoveriComponent,
    ImpiegatiComponent,
    NewImpiegatoComponent,
    ImpiegatiRepartoComponent,
    RegisterComponent,
    NewRicoveroComponent,
    RicoveriAttiviComponent,
    RicoveriPazienteComponent,
    RicoveroChiudiComponent,
    ImpiegatiDimessiComponent,
    RicercaImpiegatiDimessiComponent,
    RicercaImpiegatiAssuntiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
