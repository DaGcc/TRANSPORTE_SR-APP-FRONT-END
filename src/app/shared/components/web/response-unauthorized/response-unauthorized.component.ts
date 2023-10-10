import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppService } from 'src/app/app.service';

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

  constructor(private router: Router, private snackBar: MatSnackBar,private appService :AppService) { }

  ngOnInit(): void {
    window.scroll(0,0);

  }

  navegar() {

    this.appService.isLoad.next(true);
    this.snackBar.open('Redirigiendo a la pagina de login', 'AVISO', {
      duration: 1000,
      panelClass: 'custom-snackbar',
    })
    setTimeout(() => {
      this.router.navigate(['/auth/login'])
      this.appService.isLoad.next(false);

    }, 1000)
  }
}
