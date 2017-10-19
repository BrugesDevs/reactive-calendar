export class Appointment {
    public $key: string;

  constructor(public description: string,
              public startTime: Date,
              public endTime: Date) {
    }
}
