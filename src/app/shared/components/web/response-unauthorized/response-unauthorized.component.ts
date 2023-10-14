import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppService } from 'src/app/app.service';
import { MaterialModule } from 'src/app/_material/material.module';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    // MatIconModule,
    // MatSnackBarModule,
    // MatButtonModule,
    MaterialModule
  ],
  templateUrl: './response-unauthorized.component.html',
  styleUrls: ['./response-unauthorized.component.scss']
})
export class ResponseUnauthorizedComponent  implements OnInit {

  constructor(private _router: Router, private _snackBar: MatSnackBar,private _appService :AppService) { }

  ngOnInit(): void {
  }

  navegar() {

    this._appService.isLoad.next(true);
    const sb  = this._snackBar.open('Redirigiendo a la pagina de login', 'AVISO', {
      duration: 1000,
      verticalPosition: 'top',
      // panelClass: ['custom-snackbar'],
    })
    sb.afterDismissed().subscribe((_)=>{
      this._appService.isLoad.next(false);
      this._router.navigate(['/auth/login'])
    })

    // setTimeout(() => {
    //   this._router.navigate(['/auth/login'])
    //   this.appService.isLoad.next(false);
    // }, 1000)
  }
}
