import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import * as moment from 'moment';
import {Appointment} from "../../model/appointment.model";
import {AppointmentType} from "../../model/appointmentType.model";
import {DayWithAppointments} from "../../model/day-with-appointments.model";

@Component({
  selector: 'week-view',
  template: `
    <h2>Week: {{week}}/{{year}}</h2>
    <table>
      <tr>
        <td *ngFor="let day of days">
          <day-detail
            (addAppointment)="addAppointment.emit($event)"
            (removeAppointment)="removeAppointment.emit($event)"
            (updateAppointment)="updateAppointment.emit($event)"
            (dateSelectedEvent)="selectDate($event)"
            [appointmentTypes]="appointmentTypes"
            [activeDay]="activeDay"
            [date]="day?.date"
            [appointments]="day?.appointments">
          </day-detail>
        </td>
      </tr>
    </table>

  `
})
export class WeekViewComponent implements OnChanges {
  @Input() week: number;
  @Input() year: number;
  @Input() activeDay: number;
  @Input() appointments: Array<Appointment>;
  @Input() appointmentTypes: AppointmentType[];

  @Output() public addAppointment = new EventEmitter<Appointment>();
  @Output() public updateAppointment = new EventEmitter<Appointment>();
  @Output() public removeAppointment = new EventEmitter<Appointment>();
  @Output() public dateSelectedEvent = new EventEmitter<Date>();

  days: Array<DayWithAppointments> = [];

  ngOnChanges(simpleChanges: any): void {
    if (this.week && this.year) {
      this.days = this.calculateDaysWithAppointments(this.week, this.year, this.appointments || []);
    }
  }

  selectDate(date: Date){
    this.dateSelectedEvent.emit(date);
  }

  private calculateDaysWithAppointments(week: number, year: number, appointments: Array<Appointment>): Array<DayWithAppointments> {
    let sundayM = moment().year(year).week(week).startOf('week');
    return Array.from({length: 7}, () => null)
      .map((val, i) => {
        return {
          date: i > 0 ? moment(sundayM.toDate()).add(i, 'days').toDate() : sundayM.toDate(),
          appointments: appointments.filter((appointment: Appointment) => {
            return moment(sundayM.toDate()).weekday(i).date() === moment(appointment.startTime).date();
          })
        }
      });
  }
}
