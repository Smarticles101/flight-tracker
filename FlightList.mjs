import { getFlightSchedule, getStoredFlights, storeFlight } from "./api";

const flightListHTML = ``;

export default class FlightList {
  constructor(container_element) {
    this.container = container_element;
  }

  init() {
    let flights = getStoredFlights();
    console.log(flights)
    this.container.innerHTML = flights.map(
      (flight) => `
    <button class="collapsible" key="${flight.flight_iata + flight.dep_time}">${
        flight.flight_iata
      } at ${flight.dep_time}</button>
      <div class="content"></div>

    `
    );
  }
}
