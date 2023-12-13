import { getFlightSchedule, storeFlight } from "./api";

const flightDisplayHTML = `
<input placeholder="flight number"> <button id="input_submit">Submit</button>
<div id="flight-info-display">
<div id="departing">
<p class="airport"></p>
<p class="terminal"></p>
<p class="gate"></p>
<p class="time"></p>
</div>
<div id="arriving">
<p class="airport"></p>
<p class="terminal"></p>
<p class="gate"></p>
<p class="time"></p>
</div>
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

  updateDisplay(data) {
    this.container.querySelector("#departing .airport").innerHTML = `Departure Airport ${data.dep_iata}`;
    this.container.querySelector("#departing .terminal").innerHTML = `Departure Terminal ${data.dep_terminal}`;
    this.container.querySelector("#departing .gate").innerHTML = `Departure Gate ${data.dep_gate}`;
    this.container.querySelector("#departing .time").innerHTML = `Departure Time ${data.dep_time}`;

    this.container.querySelector("#arriving .airport").innerHTML = `Arrival Airport ${data.arr_iata}`;
    this.container.querySelector("#arriving .terminal").innerHTML = `Arrival Terminal ${data.arr_terminal}`;
    this.container.querySelector("#arriving .gate").innerHTML = `Arrival Gate ${data.arr_gate}`;
    this.container.querySelector("#arriving .time").innerHTML = `Arrival Time ${data.arr_time}`;

    console.log(data);
  }

  submit() {
    let flight_code = this.container.querySelector("input").value;
    this.container.querySelector("input").value = "";

    getFlightSchedule(flight_code).then(data => {
      this.updateDisplay.bind(this)
      storeFlight(data)
    });
  }
}
