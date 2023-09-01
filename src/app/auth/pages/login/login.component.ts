import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 


  formGroup!: FormGroup






  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email : new FormControl(undefined, [Validators.email, Validators.required]),
      password : new FormControl(undefined, Validators.required)
    })
  }


  acceder(){
    //TODO: inicio de session

    console.log(this.formGroup.controls)
    
  }
}
