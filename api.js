const TOKEN = import.meta.env.VITE_AIRLABS_TOKEN;

const URL = "https://airlabs.co/api/v9/";

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