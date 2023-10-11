import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  navegar(){
    this.router.navigate(['/page/inicio']);
    //TODO: logica aqui
  }
}