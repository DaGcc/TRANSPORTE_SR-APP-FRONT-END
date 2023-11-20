import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, inject, OnDestroy } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType, Colors } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { PrimengModule } from 'src/app/_primeng/primeng.module';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { DarkModeService } from '@shared/widgets/switch-dark-mode/dark-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule,
    PrimengModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})



export class PieChartComponent implements OnInit, OnChanges, OnDestroy {

  darkModeService = inject(DarkModeService);

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input()
  labels: any | undefined;

  @Input()
  type: any | undefined;

  @Input()
  data: any | undefined;

  @Input()
  load: boolean = true;

  subcriptorMode$! : Subscription

  public barChartPlugins = [
    // AnimationPlugin,
    DatalabelsPlugin,
  ];


  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    color: '#000',

    scales: {

      x: {
        display: false,//* Oculta la línea vertical
        ticks: {
          display: false,//* Oculta los VALORRES ubicados en la línea vertical
          // crossAlign: "near"
        },
        grid: {
          display: false //* Oculta las grillas que salen de la linea/eje x
        },
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 18
          }
        }
      },
      y: {
        display: false,//* Oculta la línea horizontal
        ticks: {
          display: false,//* Oculta los VALORRES ubicados en la línea horizontal
          // crossAlign: "near"
        },
        grid: {
          display: false//* Oculta las grillas que salen de la linea/eje y
        },
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 18
          }
        }
      }
    },
    plugins: {

      legend: {
        display: true,
        position: 'left',
        labels: {
          color: this.darkModeService.isDarkMode() ? '#fff':'#000' ,
          font: {
            family: 'Inconsolata',
            // size: 14,
          }
        },
        // onHover: (evt, item, legend) =>  {
        //   (legend.chart.data.datasets[0].backgroundColor as Array<any>).forEach((color, index, colors) => {
        //     console.log({color, index, colors})
        //     console.log(item)
        //     colors[index] = index === item.index ? color : color.slice(0,);
        //   });
        //   legend.chart.update();
        // },
        // onLeave:  (evt, item, legend) => {
        //   (legend.chart.data.datasets[0].backgroundColor as Array<any>).forEach((color, index, colors) => {
        //     colors[index] = (color as String).includes('4D') ? color.slice(0, -2) : color;
        //   });
        //   legend.chart.update();
        // }

      },
      tooltip: {
        titleColor: this.darkModeService.isDarkMode() ? '#fff':'#5800f9',
        bodyColor:  this.darkModeService.isDarkMode() ? '#A0A7AC': '#4f6168',
        titleFont: {
          family: 'Inconsolata',
        },
        bodyFont: {
          family: 'Inconsolata',
        },
        backgroundColor: this.darkModeService.isDarkMode() ? '#192229': '#eaf7ff',

      },

      datalabels: {


        display: true,
        color: "#fff"
      }

    }
  };



  // Tipo de grafico
  public pieChartType: ChartType = 'doughnut';//* dona por defecto

  // delayed : boolean = false;
  public pieChartData: ChartData<'doughnut', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        'rgba(244, 49, 0, .8)',
        ' rgba(87, 0, 250, .8) ',
        'rgba(244, 170, 0, .8)',
        'rgba(255, 0, 0, .8)',
        'rgba(255, 152, 0, .8)',
        'rgba(0, 255, 255, .8)',
      ],
      hoverBackgroundColor: [
        'rgba(244, 49, 0, 1)',
        ' rgba(87, 0, 250, 1) ',
        'rgba(244, 170, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 152, 0, 1)',
        'rgba(0, 255, 255, 1)',
      ],

      borderColor: '#000',
      borderWidth: 5,
      hoverOffset: 9,
    }]
  };


  constructor() { }

  ngOnInit(): void {
    // console.log(this.data)
    // console.log(this.labels)
    this.subcriptorMode$ = this.darkModeService.modeCambio.subscribe( d => {
      console.log(d)
      this.pieChartOptions = {
        plugins: {
    
          legend: {
            display: true,
            position: 'left',
            labels: {
              color: d ? '#fff':'#000' ,
              font: {
                family: 'Inconsolata',
                // size: 14,
              }
            },
    
          },
          tooltip: {
            titleColor: d ? '#fff':'#5800f9',
            bodyColor:  d ? '#A0A7AC': '#4f6168',
            titleFont: {
              family: 'Inconsolata',
            },
            bodyFont: {
              family: 'Inconsolata',
            },
            backgroundColor: d ? '#192229': '#a8cbe2',
          
          },
    
          datalabels: {
            display: true,
            color: "#fff"
          }
    
        }
      };
      this.grafica();
    })
  }


   ngOnChanges() {
    // console.log(this.labels)
    // console.log(this.data)
    // console.log(this.load)
    if (this.data && this.labels && this.load == false) {
      console.log("change")
       this.grafica();
    }
    
  }

  grafica() {
    this.pieChartData = {
      labels: this.labels,
      datasets: [{
        type: this.type,
        data: this.data,
        backgroundColor: [
          'rgba(244, 49, 0, .8)',
          ' rgba(87, 0, 250, .8) ',
          'rgba(244, 170, 0, .8)',
          'rgba(255, 0, 0, .8)',
          'rgba(255, 152, 0, .8)',
          'rgba(0, 255, 255, .8)',
        ],
        hoverBackgroundColor: [
          'rgba(244, 49, 0, 1)',
          ' rgba(87, 0, 250, 1) ',
          'rgba(244, 170, 0, 1)',
          'rgba(255, 0, 0, 1)',
          'rgba(255, 152, 0, 1)',
          'rgba(0, 255, 255, 1)',
        ],
        hoverBorderColor: this.darkModeService.isDarkMode() ? '#212E36': '#fff' ,
        borderColor:  this.darkModeService.isDarkMode() ? '#212E36': '#fff',
        borderWidth: 5,
        hoverOffset: 9,
      }]
    }

   
  }

  ngOnDestroy(): void {
    if(this.subcriptorMode$ ){
      this.subcriptorMode$ .unsubscribe();
    }
  }


}
