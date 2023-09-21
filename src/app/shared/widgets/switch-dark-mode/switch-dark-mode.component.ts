import { AfterViewInit, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavService } from 'src/app/home/services/sidenav.service';

@Component({
  selector: 'widget-switch-dark-mode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch-dark-mode.component.html',
  styleUrls: ['./switch-dark-mode.component.scss']
})
export class SwitchDarkModeComponent implements AfterViewInit{


  sidenavService = inject(SidenavService)

  ngAfterViewInit(): void {



    if( this.sidenavService.isDarkMode() ){
      let i  = document.getElementById('iptToggleMode');
      console.log(i)
      i?.removeAttribute('checked')
    }
  }


  toggleMode(){
    this.toggleStorage();
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


  toggleStorage(){
    if( this.sidenavService.isDarkMode() ){
      sessionStorage.removeItem('isDarkMode')
      // console.log(false)
    }else{
      sessionStorage.setItem('isDarkMode','true')
      // console.log(true)
    }
  }
}

// le puedes dar una clase common para todos los que cambiaran, y solo apuntarias a esa clase