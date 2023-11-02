import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/_material/material.module';
import { InputComponent } from '@shared/widgets/input/input.component';

@Component({
  selector: 'app-gestion-flota',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    MaterialModule
  ],
  templateUrl: './gestion-flota.component.html',
  styleUrls: ['./gestion-flota.component.scss']
})
export class GestionFlotaComponent {



  filtroPorCampo(e : String){

  }
}
