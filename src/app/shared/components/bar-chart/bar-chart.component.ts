import { AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType, ChartTypeRegistry } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
// import AnimationPlugin from 'chartjs-plugin-annotation';
// import { UtilService } from 'src/app/services/util.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PrimengModule } from 'src/app/_primeng/primeng.module';




@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule,
    PrimengModule
  ],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnChanges{


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  @Input()
  labels : String[] = ['paracetamol','ibuprofecnp','a','b','c'];

  @Input()
  data : number[] = [12,3,45,11,15];

  @Input()
  load : boolean = true


  public barChartPlugins = [
    // AnimationPlugin,
    DataLabelsPlugin,
  ];


  delayed : boolean  = false

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,//* para que se adapte al contenedor y no se desenfque o pierda resolucion
    color: '#000',
    maintainAspectRatio: false,//* para que se adapte al contenedor
    interaction: {
      mode: 'index',
      intersect: false,
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { 
      
      y: {
        beginAtZero: true,
        ticks: {
          display: false, //* muestra las marcas de los ticks en el eje y
          font:{
            family: 'Inconsolata',
          },
          color: '#fff'
        },
        grid: {
          display: false
        },
        // stacked: true
      },
     
    
    },
    plugins: {
      tooltip:{
        titleColor: '#5800f9',
        bodyColor: '#5800f9',
        titleFont: {
          family: 'Inconsolata',
        },
        bodyFont:{
          family: 'Inconsolata',
        },
        backgroundColor: 'rgb(168, 203, 226)',
      },
      legend: {
        display: true,
      
        labels: {
          font: {
            family :  'Inconsolata',
            // size: 14,
          }
        }
        
      },
      datalabels: {
        anchor: 'end',
        color: '#919191',
        font: {
          family: 'Inconsolata'
        },
        align: 'top',
        formatter: (value: number) => {
          return value.toString(); // Formatea el valor como desees
        }
      },
    },
    //* animacion 
    animation:{ //fuente : https://www.chartjs.org/docs/latest/samples/animations/delay.html && https://www.chartjs.org/docs/latest/samples/advanced/progress-bar.html
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !this.delayed) {
                  //* el da delay
          delay = context.dataIndex * 50 + context.datasetIndex * 100
        }
        return delay;
      }
    }

  }

  public barChartType: ChartType = 'scatter';

  public barChartData: ChartData = {

    labels:[],
    datasets: [
      {
        type: 'bar',
        // barPercentage: 1,
        minBarLength: 2,
        maxBarThickness: 10,
        barThickness: 7,
        // hoverBorderWidth: 10,
        // hoverBorderColor: '#5800f9',
        // barPercentage: .01,
        // clip: 2,
        label: 'bar',
        animation:{
          // delay: 100
        },
        data: [],
        // borderWidth: 1,

        backgroundColor: [
          'rgba(244, 67, 54,1);',
          // 'rgba(244, 49, 0, 1)',
          // 'rgba(255, 159, 64, 1)',
          // 'rgba(255, 205, 86, 1)',
          // 'rgba(255,255,255, 1)',
          // 'rgba(75, 192, 192, 1)',
          // 'rgba(54, 162, 235, 1)',
          // 'rgba(153, 102, 255, 1)',
          // 'rgba(201, 203, 22, 1)',
          // 'rgba(255, 205, 87, 1)',
          // 'rgba(75, 192, 145, 1)',
          // 'rgba(54, 162, 21, 1)',
        ],
        borderColor: [
          'rgba(244, 67, 54,1)',
          // 'rgba(244, 49, 0, 1)',
          // 'rgb(255, 159, 64)',
          // 'rgb(255, 205, 86)',
          // 'rgba(255,255,255, 1)',
          // 'rgb(75, 192, 192)',
          // 'rgb(54, 162, 235)',
          // 'rgb(153, 102, 255)',
          // 'rgb(201, 203, 207)'
        ]
      },
      {
        type: 'line',
        label: 'line',
        data: [],
        animation:{
          // duration: 1300,
          // delay: 200
        },
        borderWidth: 1,
        // backgroundColor: ' rgba(87, 0, 250, 0.3) ',
        backgroundColor: 'rgba(244, 67, 54,0.5)',
        // pointBackgroundColor: '#DBBDFF',
        pointBackgroundColor: 'rgba(244, 67, 54,.5)',
        borderColor: '#5800f9',
        pointHitRadius: 50,
        pointHoverBorderWidth: 0,
        pointBorderWidth: 0,
        // pointRadius: 6,
        pointRadius: 0,
        pointHoverRadius: 8,
        tension: .2,
        fill: true,

        // pointBackgroundColor: '#1e293b',
        // pointStyle: 'star'
      }

    ]

  };

  //////////////////////////////

  // ctx: any
  myChart: Chart | undefined;


  constructor() {
    // console.log(this.ctx)
  }
  ngOnChanges(): void {
    if(this.data && this.labels){
      this.graficar();
    }
    // console.log(this.data)
    // console.log(this.labels)
  }


  ngOnInit(): void {
    // console.log(this.data)
    // console.log(this.labels)

    // this.ctx = document.getElementById('chart');
    // this.dibujar();+

    // this.barChartPlugins.push({
    //   id: 'drawHorizontalLine',
    //   afterDraw: (chart: Chart) => {}
    // });
  
  }

  graficar(){
    this.barChartData = {

      labels: this.labels,
      datasets: [
        {
          type: 'bar',
          // barPercentage: 1,
          minBarLength: 2,
          maxBarThickness: 10,
          barThickness: 7,
          // hoverBorderWidth: 10,
          // hoverBorderColor: '#5800f9',
          // barPercentage: .01,
          // clip: 2,
          label: 'bar',
          animation:{
            // delay: 100
  
          },
          data: this.data,
          // borderWidth: 1,
  
          backgroundColor: [
            'rgba(244, 67, 54,.5)'
            // 'rgba(244, 49, 0, 1)',
            // 'rgba(255, 159, 64, 1)',
            // 'rgba(255, 205, 86, 1)',
            // 'rgba(255,255,255, 1)',
            // 'rgba(75, 192, 192, 1)',
            // 'rgba(54, 162, 235, 1)',
            // 'rgba(153, 102, 255, 1)',
            // 'rgba(201, 203, 22, 1)',
            // 'rgba(255, 205, 87, 1)',
            // 'rgba(75, 192, 145, 1)',
            // 'rgba(54, 162, 21, 1)',
          ],
          borderColor: [
            'rgba(244, 67, 54,1)'
            // 'rgba(244, 49, 0, 1)',
            // 'rgb(255, 159, 64)',
            // 'rgb(255, 205, 86)',
            // 'rgba(255,255,255, 1)',
            // 'rgb(75, 192, 192)',
            // 'rgb(54, 162, 235)',
            // 'rgb(153, 102, 255)',
            // 'rgb(201, 203, 207)'
          ]
        },
        {
          type: 'line',
          label: 'line',
          data: this.data,
          animation:{
            // duration: 1300,
            // delay: 200
          },
          borderWidth: 1,
          // backgroundColor: ' rgba(87, 0, 250, 0.3) ',
          backgroundColor: 'rgba(244, 67, 54,0.4)',
          borderColor: 'rgba(244, 67, 54,.7)',
          pointHitRadius: 50,
          pointHoverBorderWidth: 0,
          pointBorderWidth: 0,
          // pointRadius: 6,
          pointRadius: 0,
          pointHoverRadius: 8,
          tension: .2,
          fill: true,
          pointBackgroundColor: 'rgba(244, 67, 54,.5)',
          // pointBackgroundColor: '#1e293b',
          // pointStyle: 'star'
        }
  
      ]
  
    };
  }



  // dibujar() {
  //   const plugin = {
  //     id: 'customCanvasBackgroundColor',
  //     beforeDraw: (chart : any, args : any, options : any ) => {
  //       const {ctx} = chart;
  //       ctx.save();
  //       ctx.globalCompositeOperation = 'destination-over';
  //       ctx.fillStyle = options.color || '#000';
  //       ctx.fillRect(0, 0, chart.width, chart.height);
  //       ctx.restore();
  //     }
  //   };

  //   this.myChart = new Chart(this.ctx, {
  //     type: 'scatter',
  //     data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','p','f','c','g','gg','j','k','g','r','gh'],
  //       datasets: [{
  //         type: 'bar',
  //         // barPercentage: 1,
  //         minBarLength: 2,
  //         maxBarThickness: 5,
  //         barThickness: 2,
  //         hoverBorderWidth: 10,
  //         hoverBorderColor: '#5800f9',
  //         label: '# of Votes',
  //         data: [12, 19, 3, 5, 2, 3,26,23,7,18,4,24,5,8,5,23],
  //         // borderWidth: 1,

  //         backgroundColor: [
  //           'rgba(255, 99, 132, 1)',
  //           'rgba(255, 159, 64, 1)',
  //           'rgba(255, 205, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(201, 203, 22, 1)',
  //           'rgba(255, 205, 87, 1)',
  //           'rgba(75, 192, 145, 1)',
  //           'rgba(54, 162, 21, 1)',
  //         ],
  //         borderColor: [
  //           'rgb(255, 99, 132)',
  //           'rgb(255, 159, 64)',
  //           'rgb(255, 205, 86)',
  //           'rgb(75, 192, 192)',
  //           'rgb(54, 162, 235)',
  //           'rgb(153, 102, 255)',
  //           'rgb(201, 203, 207)'
  //         ]
  //       },{
  //         type: 'line',
  //         label: '# of Votes',
  //         data: [12, 19, 3, 5, 2, 3,26,23,7,18,4,24,5,8,5,23],
  //         borderWidth: 1,
  //         backgroundColor: ' rgba(87, 0, 250, 0.2) ',
  //         pointBackgroundColor: '#5800f9',
  //         borderColor: '#5800f9',
  //         pointHitRadius: 50,
  //         pointHoverBorderWidth : 0,
  //         pointBorderWidth: 0 ,
  //         // pointRadius: 6,
  //         pointRadius: 0,
  //         pointHoverRadius : 8,
  //         tension: .2,
  //         fill: true,

  //         // pointBackgroundColor: '#1e293b',
  //         // pointStyle: 'star'
  //       }]
  //     },

  //     options: {
  //       responsive: false,
  //       color: '#fff',
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },

  //       }
  //     },
  //     plugins: [plugin],
  //   });

  // }


  // dibujar() {
  //   new Chart(this.ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [{
  //         barPercentage: 1,
  //         barThickness: 6,
  //         maxBarThickness: 8,
  //         minBarLength: 2,
  //         label: '# of Votes',
  //         data: [12, 19, 3, 5, 2, 3],
  //         borderWidth: 1,
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',
  //           'rgba(255, 159, 64, 0.2)',
  //           'rgba(255, 205, 86, 0.2)',
  //           'rgba(75, 192, 192, 0.2)',
  //           'rgba(54, 162, 235, 0.2)',
  //           'rgba(153, 102, 255, 0.2)',
  //           'rgba(201, 203, 207, 0.2)'
  //         ],
  //         borderColor: [
  //           'rgb(255, 99, 132)',
  //           'rgb(255, 159, 64)',
  //           'rgb(255, 205, 86)',
  //           'rgb(75, 192, 192)',
  //           'rgb(54, 162, 235)',
  //           'rgb(153, 102, 255)',
  //           'rgb(201, 203, 207)'
  //         ]
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }
}
