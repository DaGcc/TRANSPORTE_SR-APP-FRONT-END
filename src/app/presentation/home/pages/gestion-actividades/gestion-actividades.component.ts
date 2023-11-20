import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-actividades',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gestion-actividades.component.html',
  styleUrls: ['./gestion-actividades.component.css']
})
export class GestionActividadesComponent implements OnInit {

  ngOnInit(): void { }

}
