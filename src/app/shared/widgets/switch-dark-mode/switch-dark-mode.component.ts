import { AfterViewInit, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeService } from './dark-mode.service';

@Component({
  selector: 'widget-switch-dark-mode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch-dark-mode.component.html',
  styleUrls: ['./switch-dark-mode.component.scss']
})
export class SwitchDarkModeComponent implements AfterViewInit{


  darkModeService = inject(DarkModeService)

  ngAfterViewInit(): void {

    //*Logica para el estado del cheked del switch
    if( this.darkModeService.isDarkMode() ){
      let i  = document.getElementById('iptToggleMode');
      // console.log(i)
      i?.removeAttribute('checked')
    }

  }


  toggleMode(){
    this.toggleStorage();

    //* este es usando la opcion 1, 2 y 3 cada uno se complementa, demas de que usarias en ::ng-deep en cada compoente para que busque 
    //* si es que el componente con clase ".cont-layout-home", tiene tambien la clase 'dark', para aplicar la logica "::ng-deep .cont-layout-home.dark &"
    //* VENTAJAS:
    //****** - Solo buscariamos a un determinado elemento para agregarle la clase y que en base a ese los otros cambien
    //****** - Solo inyectariamos una vez en el componente especifico para hacer esta logica -> [ngClass] = "{'dark', darkService.isDarkMode() }"
    document.querySelector('.cont-layout-home')?.classList.toggle('dark') 


    //! ********************** DEPRECATED **************************** */
    //*uso de la opcion 3 - ademas de que cada clase tiene que usar el "EJP 1"
    // document.querySelector('.sidenav-drawer')?.classList.toggle('dark')
    // document.querySelector('.tool-bar')?.classList.toggle('dark')
    
    // document.querySelectorAll('.cont-page').forEach( e => {
    //   e.classList.toggle('dark')
    // })
    //! ************************************************************** */



  } 


  toggleStorage(){
    if( this.darkModeService.isDarkMode() ){
      sessionStorage.removeItem('isDarkMode')
      // console.log(false)
    }else{
      sessionStorage.setItem('isDarkMode','true')
      // console.log(true)
    }
  }
}

// opcion 1 : usar "::ng-deep .cont-layout-home", pues el .cont-layout-home sera como el contenedor padre de todos los modulos dentro del modulo home
// opcion 2 : le puedes dar una clase common para todos los que cambiaran, y solo apuntarias a esa clase //! se complementa con la opcion 1 - por si apuntas a una clase
// opcion 3 : puedes buscar cada clase de cada componente y agregarle tu clase 'dark', es util para darle a uno  //!no recomendado si es que tienes muchos componentes  

/*

  *EJP 1:
  ! TENER EN CUENTA QUE CUANDO CAMBIAS DE RUTA Y REGRESAS AL COMPONENTE ANTERIOR, LA CLASE DARK SE REMUEVE SI NO APLICAS UNA LOGICA:
  ! EJP: Usar un servicio que retorne true o false en base al modo que se guardo en el session storage o local. para que de esta manera 
  ! cuando puedas inyectar en los compoenentes necesarios y que el elemento padre del componente que quieres agrega esa clase dark evalue
  ! con un [ngClass] = "{'dark', darService.isDarkMode() }", de esta manera puedes controlar ese cambio cuando cambias de ruta y regresas
  ! esto se uso en el componente de HomeLayout ubicado en ./presentation/home/layout/home-layout.


  *EJP 2:
  ! OTRA EJEMPLO USANDO ::ng-deep, con esto ya no buscarias a la clase  de tu componente para agregarle la clase dark, por que seria muy repetitivo, 
  ! pues que pasa si tienes 20 modulos, a cada modulo le tendrias que inyectar y hacer la logica [ngClass] = "{'dark', darService.isDarkMode() }"
  ! y ademas de buscar el elemento del html de tu componente que es el padre para agregarle la clase 'dark'
  ! con ::ng-deep solo buscarias al elemento elegido, y darle las clases a a tu scss de tu componente, no tocarias el html de cada compoente ni inyectarias
  ! tan repetitivamente.

*/