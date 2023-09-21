import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MaterialModule } from 'src/app/_material/material.module';
import { HomeModule } from '../../home.module';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule, //!!!!!!!TEMPORAL,
    HomeModule
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnDestroy{

  _date: Date | undefined
  s : Subscription | undefined

  constructor() {
    this.s = new Observable<Date>(observer => {
      setInterval(() => observer.next(new Date()));
    }).subscribe({
      next: (data: Date) => {
        this._date = data;
        // console.log('d')
      }
    });
  }

  











  ngOnDestroy(): void {
    this.s?.unsubscribe();
  }

}
