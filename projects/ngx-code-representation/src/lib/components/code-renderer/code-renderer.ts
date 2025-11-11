import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CodeFromUrlPipe } from '../../pipes/code-from-url.pipe';
import { HighlightAuto } from 'ngx-highlightjs';
import { file } from '../../models/file.interface';
import { JsonPipe } from '@angular/common';
import { CodeRepresentationService } from '../../services/code-representation.service';

@Component({
  selector: 'code-renderer',
  imports: [
    CodeFromUrlPipe,
    HighlightAuto,
    JsonPipe
  ],
  templateUrl: './code-renderer.html',
  styleUrl: './code-renderer.sass',
})
export class CodeRenderer implements OnInit {
  @ViewChild('codeEl') codeElementRef!: ElementRef<HTMLElement>
  @Input() file!: file
  font_size: string = '16px'

  constructor(private _codeRepresentationService: CodeRepresentationService) {
    
  }

  ngOnInit(): void {
    this._codeRepresentationService.fontsize$.subscribe({
      next: (size: string) => {
        this.font_size = size
      }
    })
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.codeElementRef) {
        this.addLineNumbersManually(this.codeElementRef.nativeElement)
        // Fade in initial table
        const table = this.codeElementRef.nativeElement.querySelector('.hljs-ln') as HTMLElement
        if (table) {
          table.style.opacity = '1'
        }
      }
    }, 200)
  }

  // selectFiel() {
  //   setTimeout(() => {
  //     this.activeFileIndex.set(index)
  //     setTimeout(() => {
  //       if (this.codeElementRef) {
  //         this.addLineNumbersManually(this.codeElementRef.nativeElement)
  //         // Fade in new table
  //         setTimeout(() => {
  //           const newTable = this.codeElementRef.nativeElement.querySelector('.hljs-ln') as HTMLElement
  //           if (newTable) {
  //             newTable.style.opacity = '1'
  //           }
  //         }, 10)
  //       }
  //     }, 50)
  //   }, 150)
  // }

  // copyToClipboard(): void {
  //   if (this.gist?.file.length === 0) return
  //   navigator.clipboard.writeText(this.activeFile!.code!).then(() => {
  //     this.copied.set(true)
  //     setTimeout(() => {
  //       this.copied.set(false)
  //     }, 2000)
  //   }).catch(err => {
  //     console.error('Failed to copy:', err)
  //   })
  // }

  private addLineNumbersManually(codeElement: HTMLElement): void {
    const highlightedHtml = codeElement.innerHTML
    const lines = highlightedHtml.split('\n')
    
    let tableHtml = '<table class="hljs-ln" style="font-size: ' + this.font_size + ' opacity: 0"><tbody>'
    lines.forEach((line, index) => {
      const lineNumber = index + 1
      tableHtml += `<tr><td class="hljs-ln-line hljs-ln-numbers" style="width: 30px text-align: right padding-right: 10px user-select: none" data-line-number="${lineNumber}"><div class="hljs-ln-n" data-line-number="${lineNumber}">${lineNumber}</div></td><td class="hljs-ln-line hljs-ln-code" data-line-number="${lineNumber}">${line || ' '}</td></tr>`
    })
    tableHtml += '</tbody></table>'
    
    codeElement.innerHTML = tableHtml
    codeElement.classList.add('hljs-line-numbers')
  }
}
