import { Component, Inject, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-factura-pdf-viewer',
  standalone: true,
  imports: [
    PdfViewerModule
  ],
  templateUrl: './factura-pdf-viewer.component.html',
  styleUrls: ['./factura-pdf-viewer.component.scss']
})
export class FacturaPdfViewerComponent implements OnInit, AfterViewInit, OnDestroy{

  pdfSrc : any = null;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data : any){
    let reader : FileReader = new FileReader();
    reader.readAsArrayBuffer(this.data);
    reader.onload = (e : any) => {
      this.pdfSrc = reader.result;
    }
  }
  ngOnDestroy(): void {
    console.log('destruye')  }

  ngAfterViewInit(): void {
    console.log('de')
  }

  ngOnInit(): void {

   
  }



}