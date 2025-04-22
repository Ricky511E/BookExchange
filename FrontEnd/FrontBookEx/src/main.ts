import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { HomepageComponent } from './app/homepage/homepage.component';

bootstrapApplication(HomepageComponent, {
  providers: [
    provideHttpClient()
  ]
});