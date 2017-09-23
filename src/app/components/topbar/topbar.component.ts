import {Component, EventEmitter, Input, Output} from '@angular/core';
import {VIEW_MODE} from '../../constants';
import {AppointmentType} from "../../types/appointmentType.model";

@Component({
  selector: 'topbar',
  template: `
    <md-toolbar color="primary">
      <span>Reactive calendar</span>
      <md-toolbar-row>
        <button md-fab (click)="previous.emit()" color="primary">
          <md-icon>chevron_left</md-icon>
        </button>
        <button md-fab (click)="next.emit()" color="primary">
          <md-icon>chevron_right</md-icon>
        </button>

        <button md-button (click)="setViewMode.emit(VIEW_MODE.DAY)" *ngIf="isVisibleDay">Day</button>
        <button md-button (click)="setViewMode.emit(VIEW_MODE.WEEK)" *ngIf="isVisibleWeek">Week</button>
        <button md-button (click)="setViewMode.emit(VIEW_MODE.MONTH)" *ngIf="isVisibleMonth">Month</button>
      </md-toolbar-row>
      <md-toolbar-row>
        <md-input-container flex>
          <input mdInput (keyup)="searchChanged.emit($event.target.value)"/>
          <md-icon class="material-icons">&#xE8B6;</md-icon>
        </md-input-container>
        <appointment-type-list style="width: 500px;"
                               (appointmentTypeClickedEvent)="appointmentTypeClicked($event)"
                                [appointmentTypes]="appointmentTypes">
        </appointment-type-list>
      </md-toolbar-row>
    </md-toolbar>
  `,
})
export class TopbarComponent {
  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter();
  @Output() setViewMode = new EventEmitter<string>();
  @Output() searchChanged = new EventEmitter<string>();
  @Output() addAppointmentClicked = new EventEmitter<AppointmentType>();

  @Input() isVisibleDay;
  @Input() isVisibleWeek;
  @Input() isVisibleMonth;
  @Input() appointmentTypes: AppointmentType[];

  VIEW_MODE = VIEW_MODE;

  appointmentTypeClicked(appointmentType: AppointmentType) {
    this.addAppointmentClicked.emit(appointmentType);
  }
}
