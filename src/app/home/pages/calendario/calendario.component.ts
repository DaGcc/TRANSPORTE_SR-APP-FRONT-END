import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../../home.module';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    CommonModule,
    HomeModule
  ],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit{


  constructor(){
    
  }

  ngOnInit(): void {

  }

 
  
}
