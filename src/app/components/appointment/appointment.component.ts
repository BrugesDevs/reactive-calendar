import {Component, Input} from "@angular/core";
import {Appointment} from "../../model/appointment.model";

@Component({
  selector: 'appointment',
  templateUrl: 'appointment.component.html',
  styles: ['']
})
export class AppointmentComponent {
@Input() appointment: Appointment;
}
