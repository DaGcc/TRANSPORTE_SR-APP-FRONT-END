import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'widget-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input()
  label : string = '';

  @Input()
  placeholder : string = '';

  @Input()
  type : string| 'number' | 'text' = 'text'
}
