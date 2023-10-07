import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isLoad  = new Subject<boolean>();

  
  constructor() { }
}
