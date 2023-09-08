import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { NavigationEnd, Router, UrlSegmentGroup, UrlTree } from '@angular/router';
import { SidenavService } from './../../services/sidenav.service';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'component-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.scss']
})
export class NavegationComponent implements OnInit, AfterViewInit {

  
  pixelResponsive: number = 900
  @Input()
  public getScreenWidth: any;

  @Input()
  public getScreenHeight: any;

  @ViewChild('drawer') drawer!: MatDrawer;


  // public ish$! : Observable<boolean>; 


  constructor(private sidenavService : SidenavService ){
    // this.ish$ = this.sidenavService.isHandset$;
  }

  // get isHandset$(){
  //   return this.sidenavService.isHandset$;
  // }
  
  ngOnInit(): void {
    this.sidenavService.sidenavCambio.subscribe({
      next: () => {
        this.drawer.toggle()
      }
    })
  }
  ngAfterViewInit(): void {
    // console.log(this.draw)
  }


  onActivate(event: Event) {
    // window.scroll(0,0);
    // window.scroll({ 
    //         top: 0, 
    //         left: 0, 
    //         behavior: 'smooth' 
    //  });
 
    document.body.scrollTop = 0;
     //or document.querySelector('body').scrollTo(0,0)
 }

}
