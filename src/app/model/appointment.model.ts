export class Appointment {
    public $key: string;

  constructor(public description: string,
              public startTime: string,
              public endTime: string,
              public reserved: boolean) {
    }
}
