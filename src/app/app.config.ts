import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { APP_CONFIG } from '@core/config/constant';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiInterceptors } from '@core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(
      withInterceptors([ApiInterceptors])
    ),
    provideRouter(routes),
    {
      provide:MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: APP_CONFIG.INPUT_STYLE}
    }
  ]
};
