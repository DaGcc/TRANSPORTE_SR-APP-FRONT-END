import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './response-forbidden.component.html',
  styleUrls: ['./response-forbidden.component.scss']
})
export class ResponseForbiddenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navegar(){
    //TODO: logica aqui
  }
}