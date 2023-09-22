import { Component, HostListener, OnInit, inject } from '@angular/core';
import { DarkModeService } from '@shared/widgets/switch-dark-mode/dark-mode.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  public screenWidth: any;
  public screenHeight: any;
  public estadoSide: boolean = true

  public darkModeService = inject(DarkModeService)

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    console.log(this.darkModeService.isDarkMode())
  } 



  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    // console.log(this.screenWidth)
    // console.log(this.screenHeight)
  }
}
