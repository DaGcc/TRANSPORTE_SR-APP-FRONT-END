import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Inject, Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SidenavService {


  sidenavCambio = new Subject<void>();


  // public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => {
  //       console.log(result)
  //       return result.matches

  //     }),
  //     shareReplay()
  //   );


  constructor(private breakpointObserver: BreakpointObserver) {
    // console.log(this.isHandset$)
  }



}
