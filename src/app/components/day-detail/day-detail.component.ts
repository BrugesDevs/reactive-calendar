import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointment } from '../../types/appointment.type';
import * as moment from 'moment';
@Component({
    selector: 'day-detail',
    template: `
      <md-card *ngIf="date">
        {{date | date: "dd/MM/yyyy"}}&nbsp;
        <md-card-content>
          <table>
            <tr *ngFor="let appointment of appointments;" [mdTooltipPosition]="'before'"
                mdTooltip="{{appointment.description}}">
              <td (click)="editMode = true">
                <md-select placeholder="Afspraak type" class="example-full-width">
                  <md-option *ngFor="let appointmentType of appointmentTypes"
                             [value]="appointmentType.value"
                             (change)="update(appointment, appointment.$key)">
                    {{ appointmentType.viewValue }}
                  </md-option>
                </md-select>
              </td>
              <td>
                <button md-mini-fab color="warn" (click)="removeAppointment.emit(appointment.$key)">
                  <md-icon>delete</md-icon>
                </button>
              </td>
            </tr>
          </table>
        </md-card-content>
        <md-card-actions>
          <button md-button color="primary" class="button-block" (click)="add()">
            <md-icon>add</md-icon>
          </button>
        </md-card-actions>
      </md-card>
    `
})
export class DayDetailComponent {
    @Input() date: Date;
    @Input() appointments: Array<Appointment>;

    @Output() public addAppointment = new EventEmitter<Date>();
    @Output() public updateAppointment = new EventEmitter<Appointment>();
    @Output() public removeAppointment = new EventEmitter<Appointment>();

    appointmentTypes = [
      {value: 'consultatie-0', viewValue: 'Consultatie'},
      {value: 'onderzoek-1', viewValue: 'Onderzoek'},
      {value: 'gesprek-2', viewValue: 'Gesprek'}
    ];

    editMode = false;

    add(): void {
        this.addAppointment.emit(moment(this.date).toDate());
    }

    update(appointment: Appointment, $key: string) {
        this.updateAppointment.emit(Object.assign({$key}, appointment));
    }
}
