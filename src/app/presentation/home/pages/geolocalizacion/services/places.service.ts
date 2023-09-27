import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation: [number, number] | undefined;


  constructor() { +
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

}
