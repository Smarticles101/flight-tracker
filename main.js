import './style.css'
import { getAirport } from './api.js'
import FlightDisplay from './FlightDisplay.mjs';
import FlightList from './FlightList.mjs';

document.querySelector('#app').innerHTML = `
  <div id="flightdisplay">
  </div>
  <div id="flightlist">
  </div>
`

const DISPLAY = new FlightDisplay(document.querySelector('#flightdisplay'));
DISPLAY.init();

const LIST = new FlightList(document.querySelector("#flightlist"));
LIST.init();
