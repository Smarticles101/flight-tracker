const TOKEN = import.meta.env.VITE_AIRLABS_TOKEN;

const URL = "https://airlabs.co/api/v9/";

export const FLIGHT_INFO_HTML = `<div class="flight-info-display">
<div class="departing">
<p class="airport"></p>
<p class="terminal"></p>
<p class="gate"></p>
<p class="time"></p>
</div>
<div class="arriving">
<p class="airport"></p>
<p class="terminal"></p>
<p class="gate"></p>
<p class="time"></p>
</div>
</div>`;

export async function getFlightSchedule(flight_iata) {
  return fetch(
    `${URL}schedules?api_key=${TOKEN}&flight_iata=${flight_iata}`
  ).then((resp) => resp.json()).then(resp => resp.response[0]);
}

export async function getAirport(airline_iata) {
  return fetch(
    `${URL}airports?api_key=${TOKEN}&iata_code=${airline_iata}`
  ).then((resp) => resp.json()).then(resp => resp.response[0]);
}

export function storeFlight(flight_data) {
  localStorage.setItem("flightlist", JSON.stringify([flight_data, ...getStoredFlights()]));
}

export function getStoredFlights() {
  try {
  let flights = JSON.parse(localStorage.getItem("flightlist"));
  if (flights) return flights;
  } catch {}

  return [];
}

export function deleteStoredFlight(flight_data) {
  let flights = getStoredFlights();

  let newflights = flights.filter(f => f.flight_iata !== flight_data.flight_iata && f.dep_time !== flight_data.dep_time);

  localStorage.setItem("flightlist", JSON.stringify(newflights));
}

export function updateDisplay(container, data) {
  container.querySelector(".departing .airport").innerHTML = `Departure Airport ${data.dep_iata || "unassigned"}`;
  container.querySelector(".departing .terminal").innerHTML = `Departure Terminal ${data.dep_terminal || "unassigned"}`;
  container.querySelector(".departing .gate").innerHTML = `Departure Gate ${data.dep_gate || "unassigned"}`;
  container.querySelector(".departing .time").innerHTML = `Departure Time ${data.dep_time || "unassigned"}`;

  container.querySelector(".arriving .airport").innerHTML = `Arrival Airport ${data.arr_iata || "unassigned"}`;
  container.querySelector(".arriving .terminal").innerHTML = `Arrival Terminal ${data.arr_terminal || "unassigned"}`;
  container.querySelector(".arriving .gate").innerHTML = `Arrival Gate ${data.arr_gate || "unassigned"}`;
  container.querySelector(".arriving .time").innerHTML = `Arrival Time ${data.arr_time || "unassigned"}`;
}
