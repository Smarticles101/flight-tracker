import {
  FLIGHT_INFO_HTML,
  getFlightSchedule,
  getStoredFlights,
  storeFlight,
  updateDisplay,
} from "./api";

const flightListHTML = ``;

export default class FlightList {
  constructor(container_element) {
    this.container = container_element;
  }

  init() {
    let flights = getStoredFlights();
    console.log(flights);
    this.container.innerHTML = flights
      .map(
        (flight) => `
    <button class="collapsible" key="${flight.flight_iata + flight.dep_time}">${
          flight.flight_iata
        } at ${flight.dep_time}</button>
      <div class="collapsible-content">
        ${FLIGHT_INFO_HTML}
      </div>`
      )
      .join("");

    let col = this.container.querySelectorAll(".collapsible");

    for (let i = 0; i < col.length; i++) {
      updateDisplay(col[i].nextElementSibling, flights[i]);
      col[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  }
}
