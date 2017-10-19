import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppointmentType} from "../../model/appointmentType.model";

@Component({
  selector: 'appointment-type-list',
  templateUrl: './appointment-type-list.component.html',
  styleUrls: ['./appointment-type-list.component.css']
})
export class AppointmentTypeListComponent implements OnInit {

  @Input() appointmentTypes : AppointmentType[];

  @Output() appointmentTypeClickedEvent = new EventEmitter<AppointmentType>();

  constructor() { }

  ngOnInit() {
  }

  appointmentTypeClicked(appointmentType: AppointmentType ) {
    this.appointmentTypeClickedEvent.emit(appointmentType);
  }
}
