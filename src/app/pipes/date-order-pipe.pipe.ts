import {Pipe, PipeTransform} from '@angular/core';
import {Appointment} from "../model/appointment.model";

@Pipe({
  name: 'dateOrderPipe'
})
export class DateOrderPipePipe implements PipeTransform {

  transform(array: Array<Appointment>, args?: any): any {
    if (!array) {
      return array;
    }
    return array.sort((a: Appointment, b: Appointment) => this.sortBasedOnStartTime(a, b));
  }

  sortBasedOnStartTime(appointmentOne: Appointment, appointmentTwo: Appointment): number {
    if (appointmentOne.startTime < appointmentTwo.startTime) {
      return -1;
    } else if (appointmentOne.startTime > appointmentTwo.startTime) {
      return 1;
    } else {
      return 0;
    }
  }

}
