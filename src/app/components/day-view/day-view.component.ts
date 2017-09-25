import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Appointment} from '../../types/appointment.model';
import {AppointmentType} from "../../types/appointmentType.model";

@Component({
  selector: 'day-view',
  template: `
    <h2>Day: {{date | date:"dd/MM/yyyy"}}</h2>
    <day-detail
      (addAppointment)="addAppointment.emit($event)"
      (removeAppointment)="removeAppointment.emit($event)"
      (updateAppointment)="updateAppointment.emit($event)"
      (dateSelectedEvent)="dateSelected($event)"
      [appointmentTypes]="appointmentTypes"
      [date]="date"
      [appointments]="appointments">
    </day-detail>

  `
})
export class DayViewComponent {
  @Input() date: Date;
  @Input() appointments: Array<Appointment>;
  @Input() appointmentTypes: Array<AppointmentType>;

  @Output() public addAppointment = new EventEmitter<Date>();
  @Output() public updateAppointment = new EventEmitter<Appointment>();
  @Output() public removeAppointment = new EventEmitter<Appointment>();
  @Output() public dateSelectedEvent = new EventEmitter<Date>();

  dateSelected(date: Date){
    console.log(date);
    this.dateSelectedEvent.emit(date);
  }

  lastAppointmentOfDay(){
    return this.appointments[this.appointments.length-1];
  }

}
