import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


interface typeAccount{
  name : string,

}

@Component({
  templateUrl: './create-acount.component.html',
  styleUrls: ['./create-acount.component.scss']
})
export class CreateAcountComponent implements OnInit{
  
  formGroup!: FormGroup

  selectedType : typeAccount | undefined;

  types : typeAccount [] | undefined

  ngOnInit(): void {

    
    this.types= [
      {
        name : 'personal'
      },
      {
        name: 'organizacion'
      }
    ]  

    this.formGroup = new FormGroup({
      nombre : new FormControl(undefined, Validators.required),
      apellidoPaterno :new FormControl( undefined, Validators.required),
      email : new FormControl(undefined, [Validators.email, Validators.required]),
      password : new FormControl( undefined, Validators.required)
    })
  }

  crearCuenta(){
    
    console.log(this.formGroup)
  
  }
}
