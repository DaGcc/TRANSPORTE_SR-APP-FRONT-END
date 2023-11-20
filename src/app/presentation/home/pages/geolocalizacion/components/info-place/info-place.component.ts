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
  constructor(
    private renderer2 : Renderer2,
    private placesService : PlacesService, 
    private mapService : MapService
  ){ }
  
  


  ngOnInit(): void { 

    this.subscriptor$ = this.mapService.infoRoute.subscribe({
      next : ( data : DirectionsResponse) => {
        console.log(data)
        this.direction = {...data}
        if(data.routes.length> 0){
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

    let lis = document.getElementsByClassName("active-route");
    for (let index = 0; index < lis.length; index++) {
      lis[index].classList.remove('active-route');
    }

    let li = document.getElementById(`li-${i}`);
    li?.classList.add('active-route');
    // .active-route
  
  }


  ngOnDestroy(): void {
    if( this.subscriptor$){
      this.subscriptor$.unsubscribe();
    }
  }


  
}
