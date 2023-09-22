import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../../home.module';

@Component({
  selector: 'app-geolocalizacion',
  standalone: true,
  imports: [CommonModule, HomeModule],
  templateUrl: './geolocalizacion.component.html',
  styleUrls: ['./geolocalizacion.component.scss']
})
export class GeolocalizacionComponent implements OnInit{


  constructor(){}
   
  ngOnInit(): void {
    window.scroll(0, 0)
  }

}
