import { FLIGHT_INFO_HTML, getFlightSchedule, storeFlight, updateDisplay } from "./api";

const flightDisplayHTML = `
<input placeholder="flight number"> <button id="input_submit">Submit</button>
<div class="loading-text"> <!--Loading-text-->
    <p>LOADING
      <span class="dot-one"> .</span>
      <span class="dot-two"> .</span>
      <span class="dot-three"> .</span>
    </p>
  </div> <!--/Loading-text-->
${FLIGHT_INFO_HTML}
</div>`;

export default class FlightDisplay {
  constructor(container_element, addflightcallback) {
    this.container = container_element;
    this.addFlightCallback = addflightcallback;
  }

  init() {
    this.container.innerHTML = flightDisplayHTML;
    this.container.querySelector(".flight-info-display").style.display = "none";

    this.container
      .querySelector("#input_submit")
      .addEventListener("click", this.submit.bind(this));
  }

  submit() {
    let flight_code = this.container.querySelector("input").value;
    this.container.querySelector(".loading-text").style.display = "block";

    getFlightSchedule(flight_code).then(data => {
      this.container.querySelector(".loading-text").style.display = "none";

      if (!data) {
        this.container.querySelector("input").setCustomValidity("Flight does not exist!");
        this.container.querySelector("input").reportValidity();
      } else {
        this.container.querySelector("input").setCustomValidity("");
        this.container.querySelector("input").reportValidity();
        this.container.querySelector("input").value = "";
        updateDisplay(this.container, data)
        this.container.querySelector(".flight-info-display").style.display = "flex";
        storeFlight(data);
        this.addFlightCallback(data);
      }
    });
  }
}
