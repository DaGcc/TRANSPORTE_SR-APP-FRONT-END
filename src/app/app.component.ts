import { Component, OnInit } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from './shared/components/breadcrumb/breadcrumb.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig, private breadcrumbService : BreadcrumbService,
    
    private router: Router,
    private viewPortScroller: ViewportScroller
    ) {}

  ngOnInit() {
      this.primengConfig.ripple = true;

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd))
        .subscribe(() => this.viewPortScroller.scrollToPosition([0, 0]));

  }

  
  // time = new Observable<string>(observer => {
  //   setInterval(() => observer.next(new Date().toString()), 1000);
  // });


  
}
