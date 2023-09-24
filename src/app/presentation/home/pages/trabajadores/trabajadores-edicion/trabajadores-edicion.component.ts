import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/_material/material.module';

@Component({
  selector: 'app-trabajadores-edicion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './trabajadores-edicion.component.html',
  styleUrls: ['./trabajadores-edicion.component.scss']
})
export class TrabajadoresEdicionComponent implements OnInit{



  frmGroupTrabajador! : FormGroup

  ngOnInit(): void {
    this.frmGroupTrabajador = new FormGroup({
      'id' : new FormControl(undefined, Validators.required),
      'nombres' : new FormControl(undefined, Validators.required)
    })
  }
}
