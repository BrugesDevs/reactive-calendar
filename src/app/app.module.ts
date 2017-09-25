import 'rxjs';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {
  MdButtonModule,
  MdCardModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdRadioModule,
  MdSelectModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './containers/app/app.component';
import {DayViewComponent} from './components/day-view/day-view.component';
import {WeekViewComponent} from './components/week-view/week-view.component';
import {MonthViewComponent} from './components/month-view/month-view.component';
import {DayDetailComponent} from './components/day-detail/day-detail.component';
import {TopbarComponent} from './components/topbar/topbar.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppointmentTypeListComponent} from './components/appointment-type-list/appointment-type-list.component';
import { DateOrderPipePipe } from './pipes/date-order-pipe.pipe';

// replace this config here with the one from firebase
export const firebaseConfig = {
  apiKey: "AIzaSyBGX7tkIPvSGy_nXcbzOSj2WU2dB0M2TzU",
  authDomain: "reactive-calendar-a4e2d.firebaseapp.com",
  databaseURL: "https://reactive-calendar-a4e2d.firebaseio.com",
  projectId: "reactive-calendar-a4e2d",
  storageBucket: "reactive-calendar-a4e2d.appspot.com",
  messagingSenderId: "147713892275"
};

@NgModule({
  declarations: [
    AppComponent,
    DayViewComponent,
    WeekViewComponent,
    MonthViewComponent,
    DayDetailComponent,
    TopbarComponent,
    AppointmentTypeListComponent,
    DateOrderPipePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdButtonModule,
    MdInputModule,
    MdTooltipModule,
    MdToolbarModule,
    MdIconModule,
    MdSelectModule,
    MdGridListModule,
    MdCardModule,
    MdRadioModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, 'reactive-calendar'),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
