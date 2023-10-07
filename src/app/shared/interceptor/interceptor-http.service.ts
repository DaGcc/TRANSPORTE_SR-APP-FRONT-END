

import { Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/app/environments/environments';
import { AppService } from 'src/app/app.service';

@Injectable({
    providedIn: 'root'
})
export class InterceptorHttpService implements HttpInterceptor {
    
    appService = inject(AppService);

    constructor(private snackBar: MatSnackBar, private router : Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(retry(environment.REINTENTOS)).
            pipe(tap(event => {
                
                if (event instanceof HttpResponse) {
                    this.appService.isLoad.next(true);
                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        throw new Error(event.body.errorMessage);
                    }else{
                        console.log('r')
                        this.snackBar.open("EXITO", 'AVISO', { duration: 5000 }); 
                        setTimeout(()=> {

                            this.appService.isLoad.next(false);   
                        },1000)
                    }
                }
            })).pipe(catchError((err) => {
                console.log(err);
                //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                if (err.status === 400) {
                    this.snackBar.open(err.message, 'ERROR 400', { duration: 5000 });
                }
                else if (err.status === 401) {
                    //console.log(err.message);
                    this.snackBar.open(err.message, 'ERROR 401', { duration: 5000 });
                    sessionStorage.clear();
                    this.router.navigate(['/login']);
                }
                else if (err.status === 500) {
                    this.snackBar.open(err.error.mensaje, 'ERROR 500', { duration: 5000 });
                } else {
                    this.snackBar.open(err.error.mensaje, 'ERROR', { duration: 5000 });
                }
                return EMPTY;
            }));
    }
}