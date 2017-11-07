export class Appointment {
    public $key: string;

  constructor(public description: string,
              public startTime: Date | string,
              public endTime: Date | string,
              public reserved: boolean) {
    }
}
