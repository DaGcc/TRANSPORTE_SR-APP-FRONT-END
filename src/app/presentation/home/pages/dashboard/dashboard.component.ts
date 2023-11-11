import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from '@shared/components/bar-chart/bar-chart.component';
import { PieChartComponent } from '@shared/components/pie-chart/pie-chart.component';
import { MaterialModule } from 'src/app/_material/material.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BarChartComponent,
    PieChartComponent,
    MaterialModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{


  labels : String[] = [];

  data : number[] = [];


  labelsTwo : String[] = ['paracetamol','ibuprofecnp','a','b','c'];

  dataTwo : number[] = [22,39,45,50,19];

  load : boolean = true; 

  ngOnInit(): void {
   setTimeout(()=> {
    this.labels = ['aa','f','a','b','c','h','y','a','b','c','ii','kl','a','b','c','iu','po','a','b','c']
    this.data = [12,3,45,111,15,12,3,45,21,15,16,3,45,11,15,12,3,45,11,15]
    this.load = false;    
   },1000)
  }

}

