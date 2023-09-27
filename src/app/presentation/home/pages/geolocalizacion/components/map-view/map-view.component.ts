import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapService } from '@home/pages/geolocalizacion/services/map.service';
import { PlacesService } from '../../services/places.service';


@Component({
  selector: 'component-map-view',
  standalone: true,
  imports: [

  ],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit {


  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor(private placeService: PlacesService, private mapService: MapService) {
    console.log(this.placeService.userLocation)
  }
  ngAfterViewInit(): void {

    if (!this.placeService.userLocation) throw new Error('No hay placesService.userLocation')
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL  
      center: this.placeService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom; numero menor es alejamiento, y el mayor es acercamiento
    });

    const popup = new Popup()
      .setHTML(`
    <h3>Aquí estoy</h3>
      <span>Estoy en este lugar del mundo</span>
    `)
    new Marker({ color: '#f00' })
      .setLngLat(this.placeService.userLocation) //posicion en la que estara ubicado en el mundo
      .setPopup(popup)
      .addTo(map)

    this.mapService.setMap(map)
  }
}


/*
  ?Estilos a usar:
  * mapbox://styles/mapbox/navigation-night-v1  //!mapa plano de color oscuro
  * mapbox://styles/mapbox/dark-v11 -> //!mapa oscuro con un zoom que muestra el planeta
*/
