import { Reserva, Reserva2, reservas2 } from "./modelo";
import "./style.css";

class Reservacion {
  reservas: Reserva[];
  precios: { [tipo: string]: number };

  constructor(reservas: Reserva[], precios: { [tipo: string]: number }) {
    this.reservas = reservas;
    this.precios = precios;
  }

  calcularSubtotal(): number {
    return this.reservas.reduce(
      (acc, reserva) => acc + this.calcularPrecioReserva(reserva),
      0
    );
  }
  calcularTotal() {
    const subtotal = this.calcularSubtotal();
    return subtotal + (this.obtenerIva() * subtotal) / 100;
  }
  obtenerIva(): number {
    return 21;
  }
  calcularPrecioReserva(reserva: Reserva): number {
    throw new Error("Falta implemntar");
  }
}

class ClienteParticular extends Reservacion {
  precioPersonaAdcional: number;
  constructor(reserva: Reserva[], precios: { [tipo: string]: number }) {
    super(reserva, precios);
    this.precioPersonaAdcional = 40;
  }
  calcularPrecioReserva(reserva: Reserva): number {
    const precioBaseTotal = this.precios[reserva.tipoHabitacion];
    const personaAdicional = reserva.pax > 1 ? (reserva.pax - 1) * 40 : 0;
    return (precioBaseTotal + personaAdicional) * reserva.noches;
  }
}

class TourOperador extends Reservacion {
  descuento: number;
  constructor(
    reserva: Reserva[],
    precios: { [tipo: string]: number },
    descuento: number
  ) {
    super(reserva, precios);
    this.descuento = descuento;
  }
  obtenerIva(): number {
    return 0;
  }
  calcularPrecioReserva(reserva: Reserva): number {
    const precioBaseTotal = this.precios[reserva.tipoHabitacion];
    return precioBaseTotal * reserva.noches;
  }

  calcularTotal(): number {
    const subtotal = this.calcularSubtotal();
    const descuento = (subtotal * this.descuento) / 100;
    return subtotal - descuento;
  }
}







/// Reservas con desayno
class ClienteParticular2 extends Reservacion {
  precioPersonaAdcional: number;
  constructor(reserva: Reserva2[], precios: { [tipo: string]: number }) {
    super(reserva, precios);
    this.precioPersonaAdcional = 40;
  }
  calcularPrecioReserva(reserva: Reserva2): number {
    const precioBaseTotal = this.precios[reserva.tipoHabitacion];
    const incluyeDesayuno = reserva.desayuno
      ? precioBaseTotal + 15
      : precioBaseTotal;
    const personaAdicional = reserva.pax > 1 ? (reserva.pax - 1) * 40 : 0;
    return (incluyeDesayuno + personaAdicional) * reserva.noches;
  }
}

class TourOperador2 extends Reservacion {
  descuento: number;
  constructor(
    reserva: Reserva2[],
    precios: { [tipo: string]: number },
    descuento: number
  ) {
    super(reserva, precios);
    this.descuento = descuento;
  }
  obtenerIva(): number {
    return 0;
  }
  calcularPrecioReserva(reserva: Reserva2): number {
    const precioBaseTotal = this.precios[reserva.tipoHabitacion];
    const incluyeDesayuno = reserva.desayuno
      ? precioBaseTotal + 15
      : precioBaseTotal;
    return incluyeDesayuno * reserva.noches;
  }

  calcularTotal(): number {
    const subtotal = this.calcularSubtotal();
    const descuento = (subtotal * this.descuento) / 100;
    return subtotal - descuento;
  }
}
const preciosSuits = { standard: 100, suite: 100 };
const preciosRegulares = { standard: 100, suite: 150 };

const nuevaReseva = new TourOperador2(reservas2, preciosSuits, 15);
//console.log(nuevaReseva);
//console.log(nuevaReseva.calcularSubtotal());
//console.log(nuevaReseva.calcularTotal());
