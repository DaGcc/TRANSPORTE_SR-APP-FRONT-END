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
    document.querySelector('.sidenav-drawer')?.classList.toggle('dark')
    document.querySelector('.tool-bar')?.classList.toggle('dark')
    
    document.querySelectorAll('.cont-page').forEach( e => {
      e.classList.toggle('dark')
    })
    // console.log(document.getElementsByClassName('cont-page'))
    // document.getElementsByClassName('cont-page')
    // .classList.toggle('dark')
  }
}

// le puedes dar una clase common para todos los que cambiaran, y solo apuntarias a esa clase