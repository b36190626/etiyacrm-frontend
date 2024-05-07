import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { getAppProviders } from './shared/providers/app-providers';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideBrowserAnimations(),
    provideHttpClient(),
    provideTranslate(),
    provideAnimationsAsync(),
    provideStore(),
    getAppProviders()
  ]
};
function provideBrowserAnimations(){
  return importProvidersFrom([BrowserModule, BrowserAnimationsModule])
}

function provideTranslate() {
  function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

  return importProvidersFrom([
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ]);
}
