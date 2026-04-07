interface AppointmentFormModel {
  name: string; // Appointment owner's name
  date: Date; // Appointment date (carries only date information, time component is unused)
  time: string; // Selected time as a string
}
interface AppointmentDomainModel {
  name: string; // Appointment owner's name
  time: Date; // Appointment time (carries both date and time information)
}
