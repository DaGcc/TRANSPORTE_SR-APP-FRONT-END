import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'widget-switch-dark-mode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch-dark-mode.component.html',
  styleUrls: ['./switch-dark-mode.component.scss']
})
export class SwitchDarkModeComponent {


  toggleMode(){
    console.log('toogle mode ')
    document.querySelector('.cont-layout-home')?.classList.toggle('dark')
  }
}
