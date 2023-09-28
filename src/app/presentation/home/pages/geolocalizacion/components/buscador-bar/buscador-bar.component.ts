import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PlacesResultBuscadorComponent } from '../places-result-buscador/places-result-buscador.component';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'component-buscador-bar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    PlacesResultBuscadorComponent
  ],
  templateUrl: './buscador-bar.component.html',
  styleUrls: ['./buscador-bar.component.scss']
})
export class BuscadorBarComponent {


  isLoadingPlaces: boolean = false

  /*
    * significa que puede ser un objeto Timeout de Node.js 
    * para usarlo tienes que hacer poner detro de tsconfoig.app.ts esto => "types": [ "node" ] 
  */
  private debounceTimer? : NodeJS.Timeout


  constructor(private placesService : PlacesService) { }


  //se llama cada vez que apretamos una tecla
  onQueryChange(query: string | undefined) {


    //EJECUCION A 
    //se cancela la ejecucion "A" anterior si es que se vuelve a llamar a onQuerhange, luego se crea otro setTimeout
    if (this.debounceTimer) clearTimeout(this.debounceTimer);


    //EJECUCION B
    //se inicia una ejecucion dentro de 1000s o puede ser eliminada e iniciada nuevamente por clearTimeOut
    this.debounceTimer = setTimeout(() => {
      console.log("mandar " + query)
      this.placesService.getPlacesByQuery(query);
    }, 500);

  }
}

/*
*DATO: 
El "debounce" es un patrón de diseño o técnica utilizada en programación para controlar la frecuencia con la que se ejecuta una función 
o acción en respuesta a eventos, especialmente eventos que pueden ocurrir repetidamente en un corto período de tiempo.

El objetivo del "debounce" es retrasar la ejecución de la función hasta que se haya esperado un período específico desde el último evento. 
De esta manera, si se generan múltiples eventos en rápida sucesión, solo se ejecutará la función una vez, después de que haya pasado el período de espera
*/