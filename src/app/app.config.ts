import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // 1. Importer HttpClient
import { provideAnimations } from '@angular/platform-browser/animations'; // 2. Importer les Animations

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),     // 3. Fournir les animations
    provideHttpClient()      // 4. Fournir le client HTTP
  ]
};
