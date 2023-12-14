import {
  FLIGHT_INFO_HTML,
  deleteStoredFlight,
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
        <div class="button-container" key=${flight.flight_iata}>
    <button class="collapsible">${
          flight.flight_iata
        } at ${flight.dep_time}</button>
        <button class="delete-collapsible">Delete</button>
        </div>
      <div class="collapsible-content">

        ${FLIGHT_INFO_HTML}
      </div>`
      )
      .join("");

    let col = this.container.querySelectorAll(".button-container");

    for (let i = 0; i < col.length; i++) {
      updateDisplay(col[i].nextElementSibling, flights[i]);
      col[i]
        .querySelector(".collapsible")
        .addEventListener("click", function () {
          this.classList.toggle("active");
          var content = col[i].nextElementSibling;
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      col[i].querySelector(".delete-collapsible").addEventListener("click", function () {
        col[i].classList.add("deleted");
        deleteStoredFlight(flights[i]);
      });
    }
  }
}
