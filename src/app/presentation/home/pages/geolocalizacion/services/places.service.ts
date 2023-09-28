import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '@infraestructure/interfaces/places';
import { MapService } from './map.service';
import { PlacesApiClientService } from '../api/places-api-client.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/*
 * Este servicio servira solo para obtener cordenadas 
 */
export class PlacesService {

  public userLocation: [number, number] | undefined;

  public isLoadingPlaces : boolean = true;
  public places : Feature[] = [];

  constructor( private http: HttpClient, private placesApiClient : PlacesApiClientService, private mapService: MapService) { 
    this.getUserLocation()
  }


  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }


  async getUserLocation(): Promise<[number, number]> {

    return new Promise((resolve, reject) => {
        
      // navigator.geolocation.watchPosition es para ver la posicion del usuario  cuando se mueve
      navigator.geolocation.getCurrentPosition(
        (args) => {
          this.userLocation = [args.coords.longitude, args.coords.latitude];
          // console.log(this.userLocation)
          resolve( this.userLocation )
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
  getPlacesByQuery(query: string = '') {

    if(query.length === 0) {
      this.isLoadingPlaces = false
      this.places = []
      return;
    }


    if(!this.userLocation) throw Error('No se encuentra la ubicacion')

    // console.log(this.userLocation)
    this.placesApiClient.get<PlacesResponse>(`/${query}.json`,{
      params: {
        proximity : this.userLocation?.join(',')
      }
    })
        .subscribe({
          next: (data) => {
            // console.log(data.features)
            this.isLoadingPlaces = false;
            this.places = data.features;
            this.mapService.createMarkersFromPlaces( data.features, this.userLocation)
          }
        })
  }


  deletePlaces(){
    this.places = [];
  }


}
