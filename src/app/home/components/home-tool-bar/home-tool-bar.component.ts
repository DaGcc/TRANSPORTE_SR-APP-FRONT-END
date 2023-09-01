import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, ElementRef, Input, Inject } from '@angular/core';

import { Observable, map } from 'rxjs';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-home-tool-bar',
  templateUrl: './home-tool-bar.component.html',
  styleUrls: ['./home-tool-bar.component.scss']
})
export class HomeToolBarComponent {
  



  // isHandset$ :  Observable<boolean> ;
  // constructor(private sidenavService : SidenavService ){
  //     this.isHandset$ = this.sidenavService.isHandset$;
  //     console.log(this.isHandset$)
  // }


  constructor(private sidenavService : SidenavService ){}

  toggle(){
    this.sidenavService.sidenavCambio.next();
    // this.sidenavService.sdCambio.set(true);
  }
}
