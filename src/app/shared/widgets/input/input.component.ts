import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output()
  valor : EventEmitter<string> = new EventEmitter();



  keyupFn( e : Event){
    const element = e.target as HTMLInputElement;
    this.valor.emit(element.value);
  }


}
