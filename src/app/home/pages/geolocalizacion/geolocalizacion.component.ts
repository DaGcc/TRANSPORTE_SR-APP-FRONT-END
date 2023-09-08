import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-geolocalizacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './geolocalizacion.component.html',
  styleUrls: ['./geolocalizacion.component.scss']
})
export class GeolocalizacionComponent implements OnInit{


  constructor(){}
   
  ngOnInit(): void {
    window.scroll(0, 0)
  }

}
