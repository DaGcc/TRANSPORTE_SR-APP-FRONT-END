import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../../home.module';
import { MapViewComponent } from '@home/pages/geolocalizacion/components/map-view/map-view.component';
import { ButtonMyLocationComponent } from '@home/pages/geolocalizacion/widgets/button-my-location/button-my-location.component';
import { PlacesService } from './services/places.service';

@Component({
  selector: 'app-geolocalizacion',
  standalone: true,
  imports: [
    CommonModule,
    HomeModule,
    MapViewComponent,
    ButtonMyLocationComponent
  ],
  templateUrl: './geolocalizacion.component.html',
  styleUrls: ['./geolocalizacion.component.scss']
})
export class GeolocalizacionComponent implements OnInit{


  constructor(private placeService : PlacesService){}
   
  ngOnInit(): void {
  }


  get isUserLocationReady(){
    return this.placeService.isUserLocationReady;
  }

}
