import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoiZGEtZ2NjIiwiYSI6ImNsa2gxcjZkZDAxeTMzbW1rdHAzaTN6dzcifQ.YWTQ2ULP8rLCiz-Wn7bm8g';


if(!navigator.geolocation){
  alert('Navegador no soporta la Geolocalizacion')
  throw new Error('Navegador no soporta la Geolocalizacion')
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
