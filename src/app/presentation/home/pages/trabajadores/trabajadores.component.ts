import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from '@shared/components/table-view/table-view.component';
import { InputComponent } from '@shared/widgets/input/input.component';
import { MatDialog } from '@angular/material/dialog';
import { TrabajadoresEdicionComponent } from './trabajadores-edicion/trabajadores-edicion.component';

@Component({
  selector: 'app-trabajadores',
  standalone: true,
  imports: [
    CommonModule,
    TableViewComponent,
    InputComponent
  ],
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.scss']
})
export class TrabajadoresComponent {

  dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'acciones'];



  openDialogEdition(): void {
    this.dialog.open(TrabajadoresEdicionComponent, {
      width: '250px',
    });
  }


}
