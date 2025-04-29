import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { HomepageComponent } from './app/homepage/homepage.component';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(HomepageComponent, AppComponent, {
  ...appConfig,
  providers: [...(appConfig.providers || []), provideRouter(routes)],
});