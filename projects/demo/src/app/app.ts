import { Component, signal } from '@angular/core';
import { CodeRepresentationComponent, gist } from '../../../ngx-code-representation/src/public-api';
import { file } from '../../../ngx-code-representation/src/lib/models/file.interface';

@Component({
  selector: 'app-root',
  imports: [
    CodeRepresentationComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
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

  gist: gist = {
    "name": "Placeholder Gist",
    "type": "Ülaceholder",
    "version": "1.0.0",
    "description": "This is a placeholder gist used for demonstration purposes.",
    "file": [
      {
        "filename": "placeholder.html",
        "language": "html",
        "code": "<div>Placeholder<\/div>"
      },
      {
        "filename": "placeholder.css",
        "language": "css",
        "code": "div { color: red; }"
      },
      {
        "filename": "placeholder.ts",
        "language": "typescript",
        "code": "console.log('This is a placeholder TypeScript file');"
      }
    ]
  }
}
