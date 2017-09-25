export class Appointment {
    public $key: string;

  constructor(public date: Date | string,
              public description: string,
              private duration: number,
              private startTime: Date | string,
              private endTime: Date | string) {
      let result = new Date();
      result.setHours(8,30);
      this.duration = 30;
      this.startTime = new Date(Date.now());
      this.endTime = new Date(result);
    }
}
