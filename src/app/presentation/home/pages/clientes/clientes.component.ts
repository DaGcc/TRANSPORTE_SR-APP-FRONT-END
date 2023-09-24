import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from '@shared/components/table-view/table-view.component';
import { InputComponent } from '@shared/widgets/input/input.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    TableViewComponent,
    InputComponent
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {


  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'acciones'];
}
