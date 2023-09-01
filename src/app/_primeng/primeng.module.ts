import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {RippleModule} from 'primeng/ripple';
import {MenuModule} from 'primeng/menu';
import { SpeedDialModule } from 'primeng/speeddial';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import {TerminalModule} from 'primeng/terminal';
import {TimelineModule} from 'primeng/timeline';
import {SkeletonModule} from 'primeng/skeleton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CarouselModule } from 'primeng/carousel';

import {DataViewModule} from 'primeng/dataview';

import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';

import {PanelMenuModule} from 'primeng/panelmenu';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RippleModule,
    ButtonModule,
    ToolbarModule,
    SplitButtonModule,
    MenuModule,
    SpeedDialModule,
    ToastModule,
    ProgressSpinnerModule,
    TerminalModule,
    TimelineModule,
    SkeletonModule,
    BreadcrumbModule,
    CarouselModule,
    DataViewModule,
    PanelModule,
    DropdownModule,
    InputTextModule,
    RatingModule,
    PanelMenuModule,
    DialogModule
  ],
  exports:[
    RippleModule, //tienes que configurar en el componente a true, o ve a la documentacion de este componente
    ButtonModule,
    ToolbarModule,
    SplitButtonModule,
    MenuModule,
    SpeedDialModule,
    ToastModule,
    ProgressSpinnerModule,
    TerminalModule,
    TimelineModule,
    SkeletonModule,
    BreadcrumbModule,
    CarouselModule,
    DataViewModule,
    PanelModule,
    DropdownModule,
    InputTextModule,
    RatingModule,
    PanelMenuModule,
    DialogModule
  ],
  providers: [
    MessageService, //para que funcione ese speedDialModule (NO ES NECESARIO, ES OPCIONAL)
  ],
})
export class PrimengModule { }
