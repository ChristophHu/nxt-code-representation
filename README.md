# Ngx-code-representation

## Demo
<p align="center">
  <a href="https://christophhu.github.io/ngx-code-representation"><img src="https://github.com/ChristophHu/ChristophHu/blob/main/assets/img/ngx-code-representation.png" width="500" alt="image" /></a>
</p>

## Description
This repository contains an Angular 20 demo that showcases the `ngx-code-representation` library. `ngx-code-representation` provides a representation of code with highlightjs for Angular apps. It’s easy to customize—sizes, colors, and behavior—to match your application’s design.

## Frameworks and Languages
<p align="left">
  <img alt="Static Badge" src="https://img.shields.io/badge/20.3.0-000000?style=for-the-badge&logo=angular&logoColor=white&label=Angular&labelColor=000000">
  <img alt="Static Badge" src="https://img.shields.io/badge/4.1.16-000000?style=for-the-badge&logo=tailwindcss&logoColor=white&label=TailwindCSS&labelColor=06B6D4&color=000000">
  <img alt="Static Badge" src="https://img.shields.io/badge/5.9.2-000000?style=for-the-badge&logo=typescript&logoColor=white&label=Typescript&labelColor=007ACC&color=000000">
</p>


## Installation
To run this project, you need to have Node.js installed on your machine. Clone the repository and run the following commands:

```bash
npm install @christophhu/ngx-code-representation
```

## Usage
Import the DatatableComponent in the app.ts.

```typescript
import { CodeRepresentationComponent } from '@christophhu/ngx-code-representation';

@NgModule({
    imports: [
        CodeRepresentationComponent,
        ...
    ]
...
})
```

```typescript
export class App {
  protected readonly title = signal('demo');
  
  testCode = `function hello() {
  console.log('Hello World');
  return true;
}`;

  files: file[] =
    [
    {filename: 'main.ts', language: 'typescript', code: `import { provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';`},
{filename: 'app.ts', language: 'typescript', code: `export interface file {
  filename: string;
  language: string;
  code: string;
}

export interface files {
  files: file[];
}`},
    {filename: 'highlight-url.ts', language: 'typescript', filepath: `assets/code/highlight-url.ts`},
  ]
}
```

Then, you can use the `<ngx-code-representation>` component in your HTML templates as shown below:
```html
<ngx-code-representation [files]="files"></ngx-code-representation>
```

```typescript
import { provideHighlightOptions } from 'ngx-highlightjs'
import { provideHttpClient } from '@angular/common/http'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml')
      },
      // https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/styles/
      themePath: 'assets/style/github-dark.css'
    }),
    provideHttpClient()
  ]
};
```
## License
This project is licensed under the MIT License.

The MIT License (MIT)
Copyright © 2025 <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
