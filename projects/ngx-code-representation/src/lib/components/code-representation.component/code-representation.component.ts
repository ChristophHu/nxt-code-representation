import { Component, ElementRef, viewChild, signal, effect, ViewChild, AfterViewInit, Input } from '@angular/core';
import { HighlightAuto } from 'ngx-highlightjs'
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers'

@Component({
  selector: 'code-representation',
  imports: [
    HighlightAuto,
    HighlightLineNumbers
  ],
  templateUrl: './code-representation.component.html',
  styleUrls: ['./code-representation.component.sass']
})
export class CodeRepresentationComponent implements AfterViewInit {
  @ViewChild('codeEl') codeElementRef!: ElementRef<HTMLElement>;
  @Input() font_size: string = '16px';
  
  copied = signal(false);
  
  code: string = `import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHighlightOptions } from 'ngx-highlightjs'`;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.addLineNumbersManually(this.codeElementRef.nativeElement);
    }, 200);
  }
  
  copyToClipboard(): void {
    navigator.clipboard.writeText(this.code).then(() => {
      this.copied.set(true);
      setTimeout(() => {
        this.copied.set(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }
  
  private addLineNumbersManually(codeElement: HTMLElement): void {
    const highlightedHtml = codeElement.innerHTML;
    const lines = highlightedHtml.split('\n');
    
    let tableHtml = '<table class="hljs-ln" style="font-size: ' + this.font_size + ';"><tbody>';
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      tableHtml += `<tr><td class="hljs-ln-line hljs-ln-numbers" style="width: 30px; text-align: right; padding-right: 10px; user-select: none;" data-line-number="${lineNumber}"><div class="hljs-ln-n" data-line-number="${lineNumber}">${lineNumber}</div></td><td class="hljs-ln-line hljs-ln-code" data-line-number="${lineNumber}">${line || ' '}</td></tr>`;
    });
    tableHtml += '</tbody></table>';
    
    codeElement.innerHTML = tableHtml;
    codeElement.classList.add('hljs-line-numbers');
  }
}
