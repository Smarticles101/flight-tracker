import { getFlightSchedule } from "./api";

const flightDisplayHTML = `
<div>
<input placeholder="flight number"> <button id="input_submit">Submit</button>
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

    getFlightSchedule(flight_code).then(r => console.log(r));
  }
}
