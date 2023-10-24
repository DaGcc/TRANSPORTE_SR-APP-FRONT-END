import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
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
export class FacturaPdfViewerComponent implements OnInit, AfterViewInit{
  pdfSrc : any;
  constructor(@Inject(MAT_DIALOG_DATA) public data : any){}
  ngAfterViewInit(): void {
    let reader : FileReader = new FileReader();
    reader.readAsArrayBuffer(this.data);
    reader.onload = (e : any) => {
      this.pdfSrc = e.target.result;
    }
  }

  ngOnInit(): void {


  }



}
