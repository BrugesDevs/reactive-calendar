import { Appointment } from './appointment.model';
export type DayWithAppointments = {
    date: Date;
    appointments: Array<Appointment>;
}
