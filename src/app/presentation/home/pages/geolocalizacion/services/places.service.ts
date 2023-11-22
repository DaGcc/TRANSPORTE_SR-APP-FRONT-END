import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '@infraestructure/interfaces/places';
import { MapService } from './map.service';
import { PlacesApiClientService } from '../api/places-api-client.service';
import { HttpClient } from '@angular/common/http';
import { AnySourceData, LngLat, LngLatLike, Marker, Popup } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
/*
 * Este servicio servira solo para obtener cordenadas 
 */
export class PlacesService {

  public userLocation: [number, number] | undefined;

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  constructor(private http: HttpClient, private placesApiClient: PlacesApiClientService, private mapService: MapService) {
    this.getUserLocation() //* se llama una sola ves al ser la primera instancia, porque los servicios de angualar son singleton
  }


  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }


  async getUserLocation(): Promise<[number, number]> {

    // console.log("llamada location")
    return new Promise((resolve, reject) => {

      // navigator.geolocation.watchPosition es para ver la posicion del usuario  cuando se mueve
      navigator.geolocation.getCurrentPosition(
        (args) => {
          this.userLocation = [args.coords.longitude, args.coords.latitude];
          // console.log(this.userLocation)
          resolve(this.userLocation)
        },
        (err) => {
          alert('no se pudo obtener la geolocalizacion')
          console.log(err)
          reject();
        }
      )
    })
  }




  // con httpClient
  // getPlacesByQuery(query: string = '') {

  //   this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=6&proximity=-75.73509163164708%2C-14.064921457799883&language=es&access_token=pk.eyJ1IjoiZGEtZ2NjIiwiYSI6ImNsa2gxcjZkZDAxeTMzbW1rdHAzaTN6dzcifQ.YWTQ2ULP8rLCiz-Wn7bm8g`)
  //       .subscribe({
  //         next: (data) => {
  //           console.log(data.features)
  //           this.isLoadingPlaces = false;
  //           this.places = data.features;
  //         }
  //       })
  // }

  // con un httpClient personalizado

  nameLocation : string | undefined; 
  getPlacesByQuery(query: string = '', proximity?: LngLat) {

    this.isLoadingPlaces = true

    if (query.length === 0) {
      this.isLoadingPlaces = false
      this.deletePlaces();
      return;
    }

    if (!this.userLocation) throw Error('No se encuentra la ubicacion')

    let p: any
    if (proximity) {
      p = {
        limit: 1
      }
    } else {
      p = {
        proximity: this.userLocation?.join(','),
        limit: 5
      }
    }
    // console.log(this.userLocation)
    this.placesApiClient.get<PlacesResponse>(`/${query}.json`, {
      params: p
    })
      .subscribe({
        next: (data) => {
          
          if(proximity) this.nameLocation = data.features[0].place_name;
          // console.log(data.features)
          // setTimeout(()=> {
          //   this.isLoadingPlaces = false;
          // }, 1000)
          
          this.isLoadingPlaces = false;
          this.places = data.features;

          if (!this.mapService.map) throw new Error("Mapa no inicializado");

          if (this.mapService.map.getLayer('places-by-query')) {
            this.mapService.map.removeLayer('places-by-query')//* removemos la capa
            this.mapService.map.removeSource('places-by-query');//* removemos el recurso de esa capa / data
          }


          const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: data.features[0].geometry.coordinates
                  }
                }
              ]
            }
          }

          this.mapService.map.addSource('places-by-query', sourceData)
          
          this.mapService.map.addLayer({
            id: 'places-by-query',
            type: 'circle',
            source: 'places-by-query'
          })
          

          if (proximity) {
            this.mapService.crearOneMarkerAndPopup(proximity);
          } else { this.mapService.createMarkersFromPlaces(data.features, this.userLocation) }
        }
      })
  }


  deletePlaces() {
    this.places = [];
  }



}
