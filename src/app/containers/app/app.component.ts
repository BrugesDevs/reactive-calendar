import {Component, OnInit} from '@angular/core';
import {VIEW_MODE} from '../../constants';
import * as moment from 'moment';
import {Appointment} from '../../model/appointment.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AppointmentType} from "../../model/appointmentType.model";
import Moment = moment.Moment;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  VIEW_MODE = VIEW_MODE;
  isVisibleDay$ = this.db.object('/config/dayVisible');
  isVisibleWeek$ = this.db.object('/config/weekVisible');
  isVisibleMonth$ = this.db.object('/config/monthVisible');

  appointmentTypes$ = this.db.list('/apointmentTypes');
  viewMode$ = new BehaviorSubject(VIEW_MODE.WEEK);
  selectedDate: Date;

  navigation$ = new BehaviorSubject<number>(0);
  searchTerm$ = new BehaviorSubject('');

  private currentDateM$ = this.viewMode$.flatMap((viewMode: string) => {
    let dateM = moment();
    return this.navigation$
      .map((action: number) => {
        switch (viewMode) {
          case VIEW_MODE.MONTH:
            return dateM.startOf('month').add(action, 'months');
          case VIEW_MODE.WEEK:
            return dateM.startOf('week').add(action, 'weeks');
          case VIEW_MODE.DAY:
            return dateM.startOf('day').add(action, 'days');
        }
        return dateM;
      })
  }).shareReplay();

  currentDate$ = this.currentDateM$.map(dateM => dateM.toDate());
  currentYear$ = this.currentDateM$.map(dateM => dateM.year());
  currentMonth$ = this.currentDateM$.map(dateM => dateM.month());
  currentWeek$ = this.currentDateM$.map(dateM => dateM.week());

  //APPOINTMENTS
  appointments$ = this.db.list('/appointments');
  filteredAppointments$ = Observable.combineLatest([this.viewMode$, this.currentDateM$, this.appointments$, this.searchTerm$],
    (viewMode: string, currentDateM: Moment, appointments: Array<Appointment>, searchTerm: string) => {
      switch (viewMode) {
        case VIEW_MODE.MONTH:
          return appointments
            .filter(item => moment(item.startTime).format('MM/YYYY') === currentDateM.format('MM/YYYY'))
            .filter(item => this.filterByTerm(item, searchTerm));
        case VIEW_MODE.WEEK:
          return appointments
            .filter(item => moment(item.startTime).format('ww/YYYY') === currentDateM.format('ww/YYYY'))
            .filter(item => this.filterByTerm(item, searchTerm));
        case VIEW_MODE.DAY:
          return appointments
            .filter(item => moment(item.startTime).format('DD/MM/YYYY') === currentDateM.format('DD/MM/YYYY'))
            .filter(item => this.filterByTerm(item, searchTerm));

      }
    }).shareReplay();

  constructor(private db: AngularFireDatabase) {
    this.selectedDate = new Date(Date.now());
  }

  ngOnInit(): void {

  }

  private filterByTerm(appointment: Appointment, term: string): boolean {
    return appointment.description.toLowerCase().indexOf(term.toLowerCase()) > -1;
  }

  selectDate(date: Date) {
    this.selectedDate = date;
  }

  onSetViewMode(viewMode: string): void {
    this.viewMode$.next(viewMode);
  }

  onPrevious(): void {
    this.navigation$.next(-1);
  }

  onNext(): void {
    this.navigation$.next(1);
  }

  onSearchChanged(e: string): void {
    this.searchTerm$.next(e);
  }

  onRemoveAppointment(id: string): void {
    this.appointments$.remove(id);
  }

  public onAddAppointmentOnDate(date: Date): void {
    this.onAddAppointment(null, date);
  }

  private onAddAppointment(appointmentType: AppointmentType, date?: Date): void {
    if (!date) {
      date = this.selectedDate;
    }
    this.appointments$.first().subscribe((appointments: Appointment[]) => {
      let lastAppointment = this.getLastAppointment(appointments, date);
      let duration = appointmentType && appointmentType.duration ? appointmentType.duration: 30;
      let hour = lastAppointment ? new Date(lastAppointment.endTime)
        : this.sameDay(new Date(Date.now()), date) ? new Date(Date.now()): date;
      this.appointments$.push(new Appointment('', hour.toISOString()
          , new Date(hour.getTime() + duration * 60000).toISOString()
        , false));
      });
  }

  getLastAppointment(appointments: Appointment[], date: Date): Appointment {
    let orderedFilteredAppointments = appointments
      .filter((appointment) => this.sameDay(new Date(appointment.startTime), date))
      .sort((a, b) =>  a.endTime > b.endTime ? -1 : 1);
    return orderedFilteredAppointments.length > 0? orderedFilteredAppointments[0]: null;
  }

  sameDay(dateOne: Date, dateTwo: Date): boolean{
    return dateOne.getFullYear() === dateTwo.getFullYear()
    && dateOne.getMonth() === dateTwo.getMonth()
    && dateOne.getDay() === dateTwo.getDay();
  }

  onUpdateAppointment(appointment: Appointment): void {
    this.db.object('appointments/' + appointment.$key).set({
      description: appointment.description,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      reserved: appointment.reserved
    });
  }
}
