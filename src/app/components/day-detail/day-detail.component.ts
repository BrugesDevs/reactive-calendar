import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Appointment} from '../../model/appointment.model';
import * as moment from 'moment';
import {AppointmentType} from "../../model/appointmentType.model";

@Component({
  selector: 'day-detail',
  templateUrl: 'day-detail.component.html',
  styles: ['.appointmentClass { padding-bottom: 10px;} .activeDay { background-color: aqua;}']
})
export class DayDetailComponent {
  @Input() date: Date;
  @Input() activeDay: Date;
  @Input() appointments: Array<Appointment>;
  @Input() appointmentTypes: Array<AppointmentType>;

  @Output() public addAppointment = new EventEmitter<Date>();
  @Output() public updateAppointment = new EventEmitter<Appointment>();
  @Output() public removeAppointment = new EventEmitter<Appointment>();
  @Output() public dateSelectedEvent = new EventEmitter<Date>();

  minuteStep = 15;
  hourStep = 1;

  editMode = false;

  constructor(){
    this.activeDay = new Date(Date.now());
  }

  add(): void {
    console.log(this.date + " == " + this.activeDay + " => " + (this.date.getDate() == this.activeDay.getDate()));//TODO LOGGING
    this.addAppointment.emit(this.date);
  }

  update(appointment: Appointment, $key: string) {
    console.log("update called");
    this.updateAppointment.emit(Object.assign({$key}, appointment));
  }

  selectDate(date: Date){
    console.log(date);
    this.dateSelectedEvent.emit(date);
  }

}
