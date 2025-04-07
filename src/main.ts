import {
  Reserva,
  Reserva2,
  reservas,
  reservas2,
  TipoHabitacion,
} from "./modelo";
import "./style.css";

class Reservacion {
  reservas: Reserva[];
  constructor(reservas: Reserva[]) {
    this.reservas = reservas;
  }

  calcularSubtotal(): number {
    return this.reservas.reduce(
      (acc, reserva) => acc + this.calcularPrecioReserva(reserva),
      0
    );
  }
  obtenerIva(): number {
    const subtotal = this.calcularSubtotal();
    return (21 * subtotal) / 100;
  }
  calcularTotal() {
    const subtotal = this.calcularSubtotal();
    const iva = this.obtenerIva();
    return iva + subtotal;
  }
  obtenerPrecioReserva(tipHabitacion: TipoHabitacion): number {
    switch (tipHabitacion) {
      case "standard":
        return 100;
      case "suite":
        return 150;
    }
  }
  calcularPrecioReserva(reserva: Reserva): number {
    const precioHabitacion = this.obtenerPrecioReserva(reserva.tipoHabitacion);
    return precioHabitacion * reserva.noches;
  }
}

class ClienteParticular extends Reservacion {
  constructor(reserva: Reserva[]) {
    super(reserva);
  }
  calcularPrecioReserva(reserva: Reserva): number {
    const precioBaseTotal = this.obtenerPrecioReserva(reserva.tipoHabitacion);
    const personaAdicional = reserva.pax > 1 ? (reserva.pax - 1) * 40 : 0;
    return (precioBaseTotal + personaAdicional) * reserva.noches;
  }
}
const nuevaReserva = new ClienteParticular(reservas);
console.log("------------ Ejercicio Cliente Regular ------------");

console.log(
  "EL subtotal de las reservas del Cliente Particular es: " +
    nuevaReserva.calcularSubtotal()
);
console.log(
  "EL iva de las reservas del Cliente Particular es: " +
    nuevaReserva.obtenerIva()
);
console.log(
  "EL total de las reservas del Cliente Particular es: " +
    nuevaReserva.calcularTotal()
);

class TourOperador extends Reservacion {
  constructor(reserva: Reserva[]) {
    super(reserva);
  }

  calcularPrecioReserva(reserva: Reserva): number {
    const precioBaseTotal = this.obtenerPrecioReserva("standard");
    const personaAdicional = reserva.pax > 1 ? (reserva.pax - 1) * 40 : 0;
    const precioFinal = (precioBaseTotal + personaAdicional) * reserva.noches;
    return precioFinal - precioFinal * 0.15;
  }
}

const nuevaReserva2 = new TourOperador(reservas);
console.log("------------ Ejercicio Tour Operador ------------");
console.log("EL subtotal es: " + nuevaReserva2.calcularSubtotal());
console.log("EL iva  es: " + nuevaReserva2.obtenerIva());
console.log("El total es : " + nuevaReserva2.calcularTotal());

/// Reservas con desayno

class TourOperador2 extends Reservacion {
  constructor(reserva: Reserva2[]) {
    super(reserva);
  }

  calcularPrecioReserva(reserva: Reserva2): number {
    const precioBase = this.obtenerPrecioReserva("standard");
    const costoPersonasExtras = reserva.pax > 1 ? (reserva.pax - 1) * 40 : 0;
    const costoDesayuno = reserva.desayuno
      ? reserva.pax * reserva.noches * 15
      : 0;

    const precioFinal =
      (precioBase + costoDesayuno + costoPersonasExtras) * reserva.noches;
    return precioFinal - precioFinal * 0.15;
  }
}

const nuevaReserva4 = new TourOperador2(reservas2);
console.log("------------ Ejercicio adicional - Tour Operador------------");
console.log("EL subtotal es: " + nuevaReserva4.calcularSubtotal());
console.log("EL iva  es: " + nuevaReserva4.obtenerIva());
console.log("El total es : " + nuevaReserva4.calcularTotal());
class ClienteParticular2 extends Reservacion {
  constructor(reserva: Reserva2[]) {
    super(reserva);
  }
  calcularPrecioReserva(reserva: Reserva2): number {
    const precioBase = this.obtenerPrecioReserva(reserva.tipoHabitacion);
    const costoPersonasExtras = reserva.pax > 1 ? (reserva.pax - 1) * 40 : 0;
    const costoDesayuno = reserva.desayuno
      ? reserva.pax * reserva.noches * 15
      : 0;
    return (precioBase + costoDesayuno + costoPersonasExtras) * reserva.noches;
  }
}

const nuevaReserva3 = new ClienteParticular2(reservas2);
console.log("------------ Ejercicio adicional - Cliente Regular------------");
console.log("EL subtotal es: " + nuevaReserva3.calcularSubtotal());
console.log("EL iva  es: " + nuevaReserva3.obtenerIva());
console.log("El total es : " + nuevaReserva3.calcularTotal());
