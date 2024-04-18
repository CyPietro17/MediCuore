import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ImpiegatiComponent } from './personale/impiegati/impiegati.component';
import { NewImpiegatoComponent } from './personale/new-impiegato/new-impiegato.component';
import { RegisterComponent } from './core/register/register.component';
import { InterceptService } from './services/intercept.service';
import { ImpiegatiRepartoComponent } from './personale/impiegati-reparto/impiegati-reparto.component';
import { ImpiegatiDimessiComponent } from './personale/impiegati-dimessi/impiegati-dimessi.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RicercaImpiegatiDimessiComponent } from './personale/ricerca/dimessi/ricerca-impiegati-dimessi/ricerca-impiegati-dimessi.component';
import { RicercaImpiegatiAssuntiComponent } from './personale/ricerca/assunti/ricerca-impiegati-assunti/ricerca-impiegati-assunti.component';
import { MaterialModule } from './core/modules';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [
    AppComponent,
    ImpiegatiComponent,
    NewImpiegatoComponent,
    ImpiegatiRepartoComponent,
    RegisterComponent,
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
