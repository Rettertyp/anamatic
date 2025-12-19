import { provideZoneChangeDetection } from "@angular/core";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()], applicationProviders: [object Object],[object Object],})
  .catch((err) => console.error(err));
