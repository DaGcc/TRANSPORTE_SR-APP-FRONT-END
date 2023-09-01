import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  templateUrl: './response-unauthorized.component.html',
  styleUrls: ['./response-unauthorized.component.scss']
})
export class ResponseUnauthorizedComponent  implements OnInit {

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    window.scroll(0,0);

  }

  navegar() {

    this.snackBar.open('Redirigiendo a la pagina de login', 'AVISO', {
      duration: 1750,
      panelClass: 'custom-snackbar',
    })
    setTimeout(() => {
      this.router.navigate(['/auth/login'])
    }, 700)
  }
}
