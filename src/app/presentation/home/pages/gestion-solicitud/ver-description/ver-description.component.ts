import { Component, Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MaterialModule } from 'src/app/_material/material.module';
import { SolicitudEntity } from '@dominio/entities/solicitud.entity';

@Component({
  selector: 'app-ver-description',
  standalone: true,
  imports: [
    DatePipe,
    MaterialModule
  ],
  templateUrl: './ver-description.component.html',
  styleUrls: ['./ver-description.component.scss']
})
export class VerDescriptionComponent {

  constructor(private _bottomSheetRef: MatBottomSheetRef<VerDescriptionComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data : SolicitudEntity) {}

}
