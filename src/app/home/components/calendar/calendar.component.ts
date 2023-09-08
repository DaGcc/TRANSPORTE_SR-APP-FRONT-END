import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';


// import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, CalendarOptions, EventClickArg } from '@fullcalendar/core';

//plugins de full calendar 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
// import multiMonthPlugin from '@fullcalendar/multimonth'

@Component({
  selector: 'component-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, AfterViewInit{

    
  @ViewChild('calendar') 
  calendar!: any;


 
  ngOnInit(): void {

  } 

  ngAfterViewInit(): void {
    console.log( this.calendar)
  
  }


  calendarOptions : CalendarOptions = {

    initialView: 'dayGridMonth',
// duration: { days: 3 },
    /*
      * dayGridMonth => hace ver al calenda en meses. !NECESITA DE dayGridPlugin.
      * dayGridWeek => hace ver el calendar en semanas !NECESITA DE dayGridPlugin.
      * timeGridWeek => hace ver al calendar en semanas, pero da el tiempo del dia a diferencia de daygridweek !MECESITA DE dayGridPlugin y timeGridPlugin.
      * dayGridDay => hace ver al calendario en el dia actual
      * timeGridDay => lo mismo que dayGridDay, pero con horas 
    */

    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],

    //*HEADER DEL CALENDARIO 
    headerToolbar: {
      left: 'prevYear,prev,next,nextYear',
      center: 'title',
      // right: 'dayGridWeek,dayGridDay,dayGridMonth'
      right: 'timeGridWeek,timeGridDay,dayGridMonth' // user can switch between the two
    },

    slotMinTime: '08:00',
    slotMaxTime: '21:00',
    expandRows: true,
    handleWindowResize: true,
    height: '100%',
    // contentHeight: 50,

    navLinks: true, // can click day/week names to navigate views
    editable: true,
    selectable: true,
    nowIndicator: true, //raa roya que indica en que tiempo del dia estas. => solo se ve en el dayGridDay
    dayMaxEvents: true,

    stickyHeaderDates: true,
    

    //*EVENTOS

    //sucede cuando das click en el grid
    dateClick : function(info) {
      alert('Clicked on: ' + info.dateStr);
      alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      alert('Current view: ' + info.view.type);
      // change the day's background color just for fun
      info.dayEl.style.backgroundColor = 'red';
    },

    //solo sucede el evento en el click de la etiqueta
    eventClick:  this.handleDateClick.bind(this),
    events: [
      { title: 'event 1', date: '2023-09-01' },
      { title: 'event 2', date: '2023-09-02' }
    ],  
    weekends: true 
  };


  // eventsPromise!: Promise<any>;

  handleDateClick(arg : EventClickArg) {
    console.log(arg)
    alert('date click! ' + arg.event.title)
  }




  toggleWeekends() {
    this.calendarOptions!.weekends = !this.calendarOptions!.weekends // toggle the boolean!
  }

  // someMethod() {
  //   let calendarApi = this.calendarComponent.getApi();
  //   calendarApi.next();
  // }

}
