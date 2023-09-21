import { Component, Input } from '@angular/core';

@Component({
  selector: 'widget-card-action',
  templateUrl: './card-action.component.html',
  styleUrls: ['./card-action.component.scss']
})
export class CardActionComponent {


  @Input()
  i : string | number | undefined 

  @Input()
  title : string = 'your title'

  @Input()
  issues : string = 'your issues'


  @Input()
  src : string | undefined
}
