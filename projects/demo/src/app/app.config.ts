import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideHighlightOptions } from 'ngx-highlightjs'
import { provideHttpClient } from '@angular/common/http'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml')
      },
      themePath: 'assets/style/github-dark.css' // https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/styles/
    }),
    provideHttpClient(),
    provideZonelessChangeDetection(),
    provideRouter(routes)
  ]
};
