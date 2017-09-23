export class Appointment {
    public $key: string;
    public time = {hour: 13, minute: 30}; //TODO TIME
    public duration = 30;//TODO DURATION

  constructor(public date: Date | string, public description: string, duration: number) {
    }
}
