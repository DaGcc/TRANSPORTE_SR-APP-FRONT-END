import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MapService } from '@home/pages/geolocalizacion/services/map.service';
import { PlacesService } from '../../services/places.service';
@Component({
  selector: 'widget-button-my-location',
  standalone: true,
  imports: [
MatButtonModule,
    MatIconModule
  ],
  templateUrl: './button-my-location.component.html',
  styleUrls: ['./button-my-location.component.scss']
})
export class ButtonMyLocationComponent {

  private mapService = inject(MapService)
  private placeService =  inject(PlacesService)

  flyToMyLocation(){
    if( !this.placeService.userLocation ) throw new Error('No se encontro placesService.userLocation')
    if( !this.mapService.isMapReady ) throw new Error("No hay mapa disponible")

    this.mapService.flyTO(this.placeService.userLocation!)
  }
}
