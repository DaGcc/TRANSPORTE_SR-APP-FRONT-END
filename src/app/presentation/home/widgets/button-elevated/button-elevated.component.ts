import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'widget-button-elevated',
  templateUrl: './button-elevated.component.html',
  styleUrls: ['./button-elevated.component.scss']
})
export class ButtonElevatedComponent {

  @Input()
  text : string | undefined;



                                                  //*(a = 1, b = 2) : void => console.log( a +b) ;
  // fnClick : ((...params : any) => (any | void)) =  () : void => console.log('Fn por defecto') ;

  @Input()
  fnClick<T>(...params: any) : T | void {
    //TODO: procesos...
    // console.log('Fn click por defecto')
  }

  @Input()
  routerLinkBtn : string | any[] | null | undefined = ['.']
}
