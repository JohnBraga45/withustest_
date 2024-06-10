import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
 import {  provideHttpClient } from '@angular/common/http';
 import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Adicione esta linha


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    FontAwesomeModule

  ]
}).catch(err => console.error(err));
