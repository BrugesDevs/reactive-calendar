import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {Appointment} from "../../model/appointment.model";
import {AppointmentType} from "../../model/appointmentType.model";

@Component({
  selector: 'appointment',
  templateUrl: 'appointment.component.html',
  styles: ['']
})
export class AppointmentComponent implements OnInit, OnChanges {

  @Input() appointment: Appointment;
  @Input() appointmentTypes: AppointmentType[];

  @Output() public updateAppointment = new EventEmitter<Appointment>();
  @Output() public removeAppointment = new EventEmitter<Appointment>();

  hour = {hour: 0, minute: 0};

  ngOnInit(): void {
    this.appointmentTypes = [new AppointmentType('appointment', 30),
      new AppointmentType('consulation', 45),
      new AppointmentType('pauze', 15)];
  }

  ngOnChanges(changes: SimpleChanges): void {
    let date = new Date(this.appointment.startTime);
    this.hour = {hour: date.getHours(), minute: date.getMinutes()};
  }

  update(appointment: Appointment, $key: string) {
    console.log("update called for element: " + $key + " appointment.$key: " + appointment.$key);
    this.updateAppointment.emit(Object.assign({$key}, appointment));//TODO WHY IS $KEY UNDEFINED and appointment.$key not?
  }

  bookAppointment(appointment: Appointment, $key: string) {
    appointment.reserved = !appointment.reserved;
    this.updateAppointment.emit(Object.assign({$key}, appointment));

    if (this.appointmentTypes) {
      this.appointmentTypes.forEach(value => console.log(value));
    }
  }

  setAfspraakType($event){
    console.log($event);
  }
}
