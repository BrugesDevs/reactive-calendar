import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Appointment} from '../../types/appointment.model';
import * as moment from 'moment';
import {AppointmentType} from "../../types/appointmentType.model";

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
    console.log(this.date + " == " + this.activeDay + " => " + (this.date.getTime() == this.activeDay.getTime()));
    this.addAppointment.emit(moment(this.date).toDate());
  }

  update(appointment: Appointment, $key: string) {
    this.updateAppointment.emit(Object.assign({$key}, appointment));
  }

  selectDate(date: Date){
    console.log(date);
    this.dateSelectedEvent.emit(date);
  }

}
