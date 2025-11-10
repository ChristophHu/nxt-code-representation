import { Component, signal } from '@angular/core';
import { CodeRepresentationComponent } from '../../../ngx-code-representation/src/public-api';
import { HighlightAuto } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@Component({
  selector: 'app-root',
  imports: [
    CodeRepresentationComponent,
    HighlightAuto,
    HighlightLineNumbers
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
}
