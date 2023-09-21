import { Component, HostListener, OnInit, inject } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  public screenWidth: any;
  public screenHeight: any;
  public estadoSide: boolean = true

  public sidenavService = inject(SidenavService)

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  } 



  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    // console.log(this.screenWidth)
    // console.log(this.screenHeight)
  }
}
