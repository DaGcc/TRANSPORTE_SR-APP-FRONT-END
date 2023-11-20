import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services/map.service';
import { Feature } from '@infraestructure/interfaces/places';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SkeletonComponent } from '@shared/widgets/skeleton/skeleton.component';

@Component({
  selector: 'component-places-result-buscador',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    SkeletonComponent
  ],
  templateUrl: './places-result-buscador.component.html',
  styleUrls: ['./places-result-buscador.component.scss']
})
export class PlacesResultBuscadorComponent {

  public selectedId : string = ''


  constructor(private placesService : PlacesService, private mapService : MapService){ }

  get isLoadingPlaces() : boolean{
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[]{
    return this.placesService.places;
  }


  
  flyTo( place : Feature ){
    this.selectedId = place.id
    const [lng, lat] = place.center;
    this.mapService.flyTO([lng, lat]);
  }

  getDireccions( place : Feature){

    if(!this.placesService.userLocation) throw Error('No hay userLocation')

    this.placesService.deletePlaces();

    const start = this.placesService.userLocation;
    const end = place.center as [number, number]
    this.mapService.getRouteBetweenPoints(start, end)

  }

}
