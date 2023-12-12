import './style.css'
import { getAirport } from './api.js'
import FlightDisplay from './FlightDisplay.mjs';

document.querySelector('#app').innerHTML = `
  <div id="flightdisplay">
  </div>
`

const DISPLAY = new FlightDisplay(document.querySelector('#flightdisplay'));
DISPLAY.init();
