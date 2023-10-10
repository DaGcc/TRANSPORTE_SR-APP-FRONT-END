import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorHttpService } from './shared/interceptor/interceptor-http.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from './environments/environments';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  let tk = sessionStorage.getItem(environment.TOKEN_NAME);
  console.log(tk)
  let token=tk!=null?tk : '';
  return token;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressBarModule,
    MatSnackBarModule,
    
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: [
          // "http://localhost:8080/oauth/token"
        ],
      },
    }),


  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHttpService,
      multi: true,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
