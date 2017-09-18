import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Appointment} from '../../types/appointment.model';
import * as moment from 'moment';
import {AppointmentType} from "../../types/appointmentType.model";

@Component({
  selector: 'day-detail',
  templateUrl: 'day-detail.component.html',
  styles: ['.appointmentClass { padding-bottom: 10px;}']
})
export class DayDetailComponent {
  @Input() date: Date;
  @Input() appointments: Array<Appointment>;
  @Input() appointmentTypes: Array<AppointmentType>;

  @Output() public addAppointment = new EventEmitter<Date>();
  @Output() public updateAppointment = new EventEmitter<Appointment>();
  @Output() public removeAppointment = new EventEmitter<Appointment>();

  minuteStep = 15;
  hourStep = 1;

  editMode = false;

  add(): void {
    this.addAppointment.emit(moment(this.date).toDate());
  }

  update(appointment: Appointment, $key: string) {
    this.updateAppointment.emit(Object.assign({$key}, appointment));
  }

  timeChanged(appointment: Appointment) {
    console.log(appointment);
    console.error(appointment);
  }
}
