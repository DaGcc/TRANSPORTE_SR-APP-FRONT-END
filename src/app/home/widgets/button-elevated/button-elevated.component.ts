import { Component, Input } from '@angular/core';

@Component({
  selector: 'widget-button-elevated',
  templateUrl: './button-elevated.component.html',
  styleUrls: ['./button-elevated.component.scss']
})
export class ButtonElevatedComponent {

  @Input()
  text : string | undefined;


}
