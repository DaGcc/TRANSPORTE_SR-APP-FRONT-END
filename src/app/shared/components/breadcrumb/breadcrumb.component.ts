import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreadcrumbService } from './breadcrumb.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


interface item { ruta: string, bread: string }

@Component({
  standalone : true,
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class BreadcrumbComponent implements OnInit {

  // titulo: string | undefined;
  // lista: item[] = [];


  // l: any[] = []




  constructor( public  breadcrumbService :  BreadcrumbService ) {
    // this.lista = this.breadcrumbService.lista;
  }

  ngOnInit( ) {  }



}
