import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

enum coloresFondo {
dee
}


@Component({
  selector: 'widget-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {




  @Input()
  value: string = ''


  @Input()
  colorFondo: "primary" |"succes" | "warning" | "danger" = "primary"

  get getColorFondo(){
    switch (this.colorFondo){
      case "primary" : {
        return "#3B82F6";
      }
      case "succes" : {
        return "#22C55E";
      }
      case "warning" : {
        return "#F59E0B";
      }
      case "danger" : {
        return "#EF4444";
      }
      default : {
        return "#3B82F6";
      }
    }
  }

}
