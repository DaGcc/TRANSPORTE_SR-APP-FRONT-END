import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  modeCambio = new Subject<boolean>();

  constructor() {
    // this.isDarkMode(); //* las funciones en el constructor solo se usa par inicializar una variable en base a dicho metodo que le da valor
  }


  isDarkMode() {
    // if (sessionStorage.getItem('isDarkMode')){
    //   return true;
    // } else{
    //   return false;
    // }
    // console.log(sessionStorage.getItem('isDarkMode'))

    // return sessionStorage.getItem('isDarkMode')  ? true : false; 
    return  !!sessionStorage.getItem('isDarkMode'); 
  }

}
