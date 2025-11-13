import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { CodeRenderer } from './code-renderer';
import { CodeRepresentationService } from '../../services/code-representation.service';
import { file } from '../../models/file.interface';

describe('CodeRenderer', () => {
  let component: CodeRenderer;
  let fixture: ComponentFixture<CodeRenderer>;
  let service: CodeRepresentationService;

  const mockFile: file = {
    filename: 'test.ts',
    language: 'typescript',
    code: 'const test = "hello world";'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeRenderer],
      providers: [
        CodeRepresentationService,
        provideZonelessChangeDetection(),
        provideHighlightOptions({
          coreLibraryLoader: () => import('highlight.js/lib/core'),
          languages: {
            typescript: () => import('highlight.js/lib/languages/typescript')
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CodeRenderer);
    component = fixture.componentInstance;
    service = TestBed.inject(CodeRepresentationService);
    component.file = mockFile;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should have default font size of 16px', async () => {
    expect(component.font_size).toBe('16px');
  });

  // it('should update font size when service emits new size', async () => {
  //   service.increaseFontSize();
  //   fixture.detectChanges();
  //   await fixture.whenStable();

  //   expect(component.font_size).toBe('18px');
  // });

  it('should call increaseFontSize on service', async () => {
    spyOn(service, 'increaseFontSize');
    
    component.increaseFontSize();
    
    expect(service.increaseFontSize).toHaveBeenCalled();
  });

  it('should call decreaseFontSize on service', async () => {
    spyOn(service, 'decreaseFontSize');
    
    component.decreaseFontSize();
    
    expect(service.decreaseFontSize).toHaveBeenCalled();
  });

  it('should copy code to clipboard', async () => {
    const clipboardSpy = spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    
    component.copyToClipboard();
    
    expect(clipboardSpy).toHaveBeenCalledWith('const test = "hello world";');
  });

  it('should render file code', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const codeElement = compiled.querySelector('code');
    
    expect(codeElement).toBeTruthy();
  });
});
