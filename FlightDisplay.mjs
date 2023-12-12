const flightDisplayHTML = `
<div>
<input> <button id="input_submit">Submit</button>
</div>`;

export default class FlightDisplay {
  constructor(container_element) {
    this.container = container_element;
  }

  init() {
    this.container.innerHTML = flightDisplayHTML;

    this.container
      .querySelector("#input_submit")
      .addEventListener("click", this.submit);
  }

  submit() {
    console.log("submitted");
  }
}
