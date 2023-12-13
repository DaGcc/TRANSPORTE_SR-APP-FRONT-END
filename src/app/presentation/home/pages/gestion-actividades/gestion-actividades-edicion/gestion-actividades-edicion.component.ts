import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-actividades-edicion',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gestion-actividades-edicion.component.html',
  styleUrls: ['./gestion-actividades-edicion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionActividadesEdicionComponent implements OnInit {

  ngOnInit(): void { }

}
