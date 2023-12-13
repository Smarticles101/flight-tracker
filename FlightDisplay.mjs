import { FLIGHT_INFO_HTML, getFlightSchedule, storeFlight, updateDisplay } from "./api";

const flightDisplayHTML = `
<input placeholder="flight number"> <button id="input_submit">Submit</button>
${FLIGHT_INFO_HTML}
</div>`;

export default class FlightDisplay {
  constructor(container_element) {
    this.container = container_element;
  }

  init() {
    this.container.innerHTML = flightDisplayHTML;

    this.container
      .querySelector("#input_submit")
      .addEventListener("click", this.submit.bind(this));
  }

  submit() {
    let flight_code = this.container.querySelector("input").value;
    this.container.querySelector("input").value = "";

    getFlightSchedule(flight_code).then(data => {
      // TODO: if no flight, data is undef. handle error
      updateDisplay(this.container, data)
      storeFlight(data)
    });
  }
}
