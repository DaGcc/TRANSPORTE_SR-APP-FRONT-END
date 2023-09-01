import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from './shared/components/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig, private breadcrumbService : BreadcrumbService ) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
  }

  
  time = new Observable<string>(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  
}
