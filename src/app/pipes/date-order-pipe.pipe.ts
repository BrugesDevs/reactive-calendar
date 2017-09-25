import { Pipe, PipeTransform } from '@angular/core';
import {Appointment} from "../types/appointment.model";

@Pipe({
  name: 'dateOrderPipe'
})
export class DateOrderPipePipe implements PipeTransform {

  transform(array: Array<Appointment>, args?: any): any {
    array.sort((a: Appointment, b: Appointment) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
