import { Injectable } from '@angular/core';
import { Marker,Map, LngLatLike } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

   
  private map : Map | undefined; 
  private markers : Marker[] = []


  constructor() { }

  setMap( map : Map){
    this.map = map;
  }

  get isMapReady(){
    return !!this.map;
  }


  //desplazarme al lugar que quiero con las cordeenadas, como por ejemplo, mi ubicacion cuando muevo mucho el mapa
  flyTO( coords : LngLatLike){

    if( !this.isMapReady ) throw new Error('Error al inicializar mapa.')

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }


}  
