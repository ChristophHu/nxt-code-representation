import { Component, ElementRef, signal, AfterViewInit, Input, OnInit } from '@angular/core'
import { file } from '../../models/file.interface'
import { gist } from '../../models/gist.interface'
import { CommonModule } from '@angular/common'
import { PreviewRenderer } from '../preview-renderer/preview-renderer'
import { CodeRepresentationService } from '../../services/code-representation.service'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { CodeRenderer } from '../code-renderer/code-renderer'
import { IconsComponent } from '@christophhu/ngx-icons'
import { CodeEnum } from '../../models/code.enum'

@Component({
  selector: 'code-representation',
  imports: [
    CodeRenderer,
    CommonModule,
    PreviewRenderer,
    IconsComponent
],
  templateUrl: './code-representation.component.html',
  styleUrls: ['./code-representation.component.sass']
})
export class CodeRepresentationComponent implements OnInit {
  gist$: Observable<gist | null> = of(null)

  private _file = new BehaviorSubject<file | null>(null)
  file$: Observable<file | null> = this._file.asObservable()
  
  copied = signal(false)
  activeFileIndex = signal(0)
  activeView = signal<CodeEnum.CODE | CodeEnum.PREVIEW>(CodeEnum.CODE)

  // get activeFile(): file | null {
  //   if (this.gist?.file.length === 0) return null
  //   return this.gist!.file[this.activeTabIndex()]
  // }

  constructor(private _codeRepresentationService: CodeRepresentationService) {}
  
  ngOnInit(): void {
    this.gist$ = this._codeRepresentationService.gist$
  }

  selectFile(index: number): void {
    if (index === this.activeFileIndex()) return
    
    // Hide code element and fade out table

    // if (this.codeElementRef.nativeElement && this.codeElementRef.nativeElement.classList.contains('hljs-line-numbers')) {
    //   this.codeElementRef.nativeElement.classList.remove('hljs-line-numbers')
    // }
    // const table = this.codeElementRef.nativeElement.querySelector('.hljs-ln') as HTMLElement
    // if (table) {
    //   table.style.opacity = '0'
    // }
    
    
  }

  selectView(view: CodeEnum.CODE | CodeEnum.PREVIEW): void {
    this.activeView.set(view)
  }
}
