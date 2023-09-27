import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'component-buscador-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buscador-bar.component.html',
  styleUrls: ['./buscador-bar.component.scss']
})
export class BuscadorBarComponent {



  onQueryChange( e : any){}
}
