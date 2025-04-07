export type TipoHabitacion  = "standard" | "suite"
export interface Reserva {
 
  tipoHabitacion: TipoHabitacion;
    pax: number;
    noches: number;
  }
  
export const reservas: Reserva[] =[
    {
      tipoHabitacion: "standard",
      pax: 1,
      noches: 3,
    },
    {
      tipoHabitacion: "standard",
      pax: 1,
      noches: 4,
    },
    {
      tipoHabitacion: "suite",
      pax: 2,
      noches: 1,
  },
];
  
export interface Reserva2 {
  tipoHabitacion: "standard" | "suite";
  desayuno: boolean;
  pax: number;
  noches: number;
}

export const reservas2: Reserva2[] = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];