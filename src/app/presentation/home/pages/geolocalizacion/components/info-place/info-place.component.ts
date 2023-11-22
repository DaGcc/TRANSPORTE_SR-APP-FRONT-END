import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Renderer2, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { PlacesService } from '../../services/places.service';
import { DirectionsResponse, Route } from '@infraestructure/interfaces/directions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-place',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './info-place.component.html',
  styleUrls: ['./info-place.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoPlaceComponent implements OnInit,OnDestroy {


  direction : DirectionsResponse | undefined;
  subscriptor$! : Subscription

  routeSelected : Route | undefined;
  namePlace : string | undefined;

  constructor(
    private renderer2 : Renderer2,
    private placesService : PlacesService, 
    private mapService : MapService
  ){ }
  
  


  ngOnInit(): void { 

    this.subscriptor$ = this.mapService.infoRoutes.subscribe({
      next : ( data : DirectionsResponse) => {
        console.log(data)
        this.direction = {...data}
        if(data.routes.length> 0){
          this.namePlace = this.placesService.nameLocation;
          this.routeSelected = data.routes[0];
          document.querySelector("#main")?.classList.remove("show-container");
          document.querySelector("#subMain")?.classList.remove("hide-element");
        }
      }
    })
  }


  toggleContainer(){
    document.querySelector("#main")?.classList.toggle("show-container")
    document.querySelector("#subMain")?.classList.toggle("hide-element");
  }


  mostrarRuta(route : Route, i : number){
    // console.log(route)
    this.routeSelected = route;
    let lis = document.getElementsByClassName("active-route");
    for (let index = 0; index < lis.length; index++) {
      lis[index].classList.remove('active-route');
    }

    let li = document.getElementById(`li-${i}`);
    li?.classList.add('active-route');
    // .active-route

    this.mapService.drawPolyLine(route);
  
  }

  // getDireccions( place : Feature){

  //   // this.placesService.nameLocation = place.place_name;
    

  //   this.placesService.deletePlaces();

  //   const start = this.placesService.userLocation;
  //   const end = place.center as [number, number]
  //   this.mapService.getRouteBetweenPoints(start, end)

  // }



  ngOnDestroy(): void {
    if( this.subscriptor$){
      this.subscriptor$.unsubscribe();
    }
  }


  
}
