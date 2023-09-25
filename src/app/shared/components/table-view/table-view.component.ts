import { Component, ViewChild, OnInit, AfterViewInit, OnChanges, SimpleChanges, Input, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { MaterialModule } from 'src/app/_material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InputComponent } from '@shared/widgets/input/input.component';
import { find } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'componente-table-view',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    TitleCasePipe,
    MaterialModule,
    InputComponent
  ],
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit, AfterViewInit, OnChanges {

  //********** INYECTIONES DE SERVICIOS CORE *************
  dialog = inject(MatDialog);
  overlay = inject(Overlay);
  //**************************************************** */

  //!-------------------------------------------------------------------------

  //********** PROPIEDADES CORE DEL COMPOENTE *************
  @Input()
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'acciones'];;
  @Input()
  data: any;
  //**************************************************** */

  //!-------------------------------------------------------------------------

  // fnCU<T>(...params : any) : T | void {
  //   //TODO: procesos...
  //   // console.log('Fn click por defecto')
  // } 

  //********** FUNCIONES CORE DEL COMPONENTE *************
  @Input()
  fnCreateOrUpdate: (...params: any) => void | any = () => { };
  @Input()
  fnDelete: (...params: any) => void | any = () => { }
  //**************************************************** */

  //!-------------------------------------------------------------------------


  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  //***********************************************
  //******* ciclos de vida del componente *********
  //***********************************************
  ngOnInit(): void {
    const users: any = Array.from({ length: 100 }, (_, k) => this.createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes')
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }
  //***********************************************
  //***** END - ciclos de vida del componente *****
  //***********************************************





  //TODO: metodos y sus implementaciones

  createNewUser(id: number): UserData {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';

    return {
      id: id.toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
    };
  }

  //*********** METODO DE FILTRO CORE ********* */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 //******* END - METODO DE FILTRO CORE ****+*** */
}
