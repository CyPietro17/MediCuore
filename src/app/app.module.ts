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
import { NewRicoveroComponent } from './ricovero/new-ricovero/new-ricovero.component';
import { RicoveriAttiviComponent } from './ricovero/ricoveri-attivi/ricoveri-attivi.component';
import { RicoveriPazienteComponent } from './ricovero/ricoveri-paziente/ricoveri-paziente.component';
import { InterceptService } from './services/intercept.service';
import { RicoveroChiudiComponent } from './ricovero/ricovero-chiudi/ricovero-chiudi.component';
import { ImpiegatiRepartoComponent } from './personale/impiegati-reparto/impiegati-reparto.component';
import { RicoveriComponent } from './ricovero/ricoveri/ricoveri.component';
import { ImpiegatiDimessiComponent } from './personale/impiegati-dimessi/impiegati-dimessi.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RicercaImpiegatiDimessiComponent } from './personale/ricerca/dimessi/ricerca-impiegati-dimessi/ricerca-impiegati-dimessi.component';
import { RicercaImpiegatiAssuntiComponent } from './personale/ricerca/assunti/ricerca-impiegati-assunti/ricerca-impiegati-assunti.component';

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
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatSlideToggleModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
