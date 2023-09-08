import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MaterialModule } from 'src/app/_material/material.module';



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule //!!!!!!!TEMPORAL
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent  {
  


 
}
