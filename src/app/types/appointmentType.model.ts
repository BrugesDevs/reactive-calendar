export class AppointmentType {
  public name: string;
  public duration: number;

  constructor(public date: Date | string, public description: string) {
  }
}
