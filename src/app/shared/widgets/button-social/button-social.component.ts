import { AfterContentChecked, AfterViewChecked, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { TypeButton } from './btn-types';
// import { TypeButton } from './';



@Component({
  selector: 'widget-button-social',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './button-social.component.html',
  styleUrls: ['./button-social.component.scss']
})
export class ButtonSocialComponent implements  OnChanges{

  btnTypes = TypeButton

  @Input()
  btnType : TypeButton = TypeButton.BtnGitHub;


  @Input()
  link : string = '.'
  
  constructor(){
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.btnTypes.BtnGitHub.toLocaleString())
    console.log(this.link)
  }


  navegar(){
    let a = document.createElement('a');

    // if( !this.link ) throw new Error('Se necesita el link')
    a.href = this.link;
    a.target = "_blank"
    a.style.display = 'none';
    // document.querySelector('.btnGit')!.append(a)
    a.click();
    a.remove()
  }

}
