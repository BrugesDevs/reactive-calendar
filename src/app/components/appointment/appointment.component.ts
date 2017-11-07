import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Appointment} from "../../model/appointment.model";

@Component({
  selector: 'appointment',
  templateUrl: 'appointment.component.html',
  styles: ['']
})
export class AppointmentComponent {
 @Input() appointment: Appointment;

  @Output() public updateAppointment = new EventEmitter<Appointment>();
  @Output() public removeAppointment = new EventEmitter<Appointment>();


  update(appointment: Appointment, $key: string) {
    console.log("update called");
    this.updateAppointment.emit(Object.assign({$key}, appointment));
  }

  bookAppointment(appointment: Appointment, $key: string) {
    appointment.reserved = !appointment.reserved;
    this.updateAppointment.emit(Object.assign({$key}, appointment));
  }
}
