import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// import { MaterialModule } from 'src/app/_material/material.module';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './response-not-found.component.html',
  styleUrls: ['./response-not-found.component.scss']
})
export class ResponseNotFoundComponent implements OnInit {

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //toda tu logica aquí
  }
  navegar() {

    this.snackBar.open('Redirigiendo a la pagina de inicio', 'AVISO', {
      duration:3000,
    })
    setTimeout(() => {
      this.router.navigate(['/page']);
    }, 1700)
  }
}
