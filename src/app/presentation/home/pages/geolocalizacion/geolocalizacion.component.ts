import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../../home.module';
import { MapViewComponent } from '@home/components/map-view/map-view.component';
import { PlacesService } from '@home/services/places.service';

@Component({
  selector: 'app-geolocalizacion',
  standalone: true,
  imports: [
    CommonModule,
    HomeModule,
    MapViewComponent
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
