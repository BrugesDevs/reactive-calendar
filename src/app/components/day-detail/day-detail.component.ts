import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Appointment} from '../../model/appointment.model';
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
  @Input() appointmentTypes: AppointmentType[];

  @Output() public addAppointment = new EventEmitter<Date>();
  @Output() public updateAppointment = new EventEmitter<Appointment>();
  @Output() public removeAppointment = new EventEmitter<Appointment>();
  @Output() public dateSelectedEvent = new EventEmitter<Date>();

  minuteStep = 15;
  hourStep = 1;

  editMode = false;

  constructor() {
    this.activeDay = new Date(Date.now());
  }

  add(): void {
    this.addAppointment.emit(this.date);
  }

  selectDate(date: Date) {
    console.log(date);
    this.dateSelectedEvent.emit(date);
  }
}
