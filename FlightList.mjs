import {
  FLIGHT_INFO_HTML,
  deleteStoredFlight,
  getFlightSchedule,
  getStoredFlights,
  storeFlight,
  updateDisplay,
} from "./api";

const flightToHTML = (flight) => `
<div class="button-container" key=${flight.flight_iata}>
<button class="collapsible">${flight.flight_iata} at ${flight.dep_time}</button>
<button class="delete-collapsible">Delete</button>
</div>
<div class="collapsible-content">

${FLIGHT_INFO_HTML}
</div>`;

export default class FlightList {
  constructor(container_element) {
    this.container = container_element;
  }

  addFlight(data) {
    let html = flightToHTML(data);

    this.container.insertAdjacentHTML("afterbegin", html);
    this.container.querySelector(".button-container").classList.add("created");

    let bc = this.container.querySelector(".button-container");

    updateDisplay(bc.nextElementSibling, data);
      bc
        .querySelector(".collapsible")
        .addEventListener("click", function () {
          this.classList.toggle("active");
          var content = bc.nextElementSibling;
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      bc
        .querySelector(".delete-collapsible")
        .addEventListener("click", function () {
          bc.classList.remove("created");
          bc.classList.add("deleted");
          deleteStoredFlight(data);
        });
  }

  init() {
    let flights = getStoredFlights();
    this.container.innerHTML = flights.map(flightToHTML).join("");

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
      col[i]
        .querySelector(".delete-collapsible")
        .addEventListener("click", function () {
          col[i].classList.add("deleted");
          deleteStoredFlight(flights[i]);
        });
    }
  }
}
