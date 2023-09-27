import { Injectable } from '@angular/core';
import { Feature } from '@infraestructure/interfaces/places';
import { Marker,Map, LngLatLike, Popup, LngLatBounds } from 'mapbox-gl';;

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


  createMarkersFromPlaces( places : Feature[],  userLocation : [number , number] | undefined ){
    if( !this.map ) throw Error('Mapa no inicializaado')
    
    this.markers.forEach( marker => marker.remove() )
    const newMarkers  = []

    for( const place of places ){
      const [lng,lat] = place.center
      const popup = new Popup()
      .setHTML(`
        <h6>${place.text}</h6>
        <span>${place.place_name}</span>
      `)

      const newMarker = new Marker()
      .setLngLat([lng,lat])
      .setPopup( popup )
      .addTo(this.map);

      newMarkers.push( newMarker)

    }

    this.markers = newMarkers;

    if( places.length == 0) return;

    //limites del mapa
    const bounds = new LngLatBounds();

    bounds.extend( userLocation! )
    newMarkers.forEach( marker => {

      bounds.extend(marker.getLngLat())
    } )
    this.map.fitBounds(bounds,{
      padding: 200
    } )

  }


}  
