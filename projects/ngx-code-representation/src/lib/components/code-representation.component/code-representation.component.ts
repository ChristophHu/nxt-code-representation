import { Component, signal, OnInit } from '@angular/core'
import { file } from '../../models/file.interface'
import { gist } from '../../models/gist.interface'
import { CommonModule } from '@angular/common'
import { PreviewRenderer } from '../preview-renderer/preview-renderer'
import { CodeRepresentationService } from '../../services/code-representation.service'
import { Observable, of } from 'rxjs'
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
  file$: Observable<file | null> = of(null)

  copied = signal(false)
  activeFileIndex = signal(0)
  activeView = signal<CodeEnum.CODE | CodeEnum.PREVIEW>(CodeEnum.CODE)

  constructor(private _codeRepresentationService: CodeRepresentationService) {}
  
  ngOnInit(): void {
    this.gist$ = this._codeRepresentationService.gist$
    this.file$ = this._codeRepresentationService.file$
  }

  selectFile(index: number): void {
    if (index === this.activeFileIndex()) return
    this._codeRepresentationService.setFile(index) 
  }

  selectView(view: CodeEnum.CODE | CodeEnum.PREVIEW): void {
    this.activeView.set(view)
  }
}
