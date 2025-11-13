import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CodeRepresentationService } from './code-representation.service';
import { gist } from '../models/gist.interface';
import { file } from '../models/file.interface';

describe('CodeRepresentationService', () => {
  let service: CodeRepresentationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        CodeRepresentationService,
        provideZonelessChangeDetection()
      ]
    }).compileComponents();
    
    service = TestBed.inject(CodeRepresentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and emit gist', async () => {
    const mockGist: gist = {
      name: 'test-gist',
      type: 'test',
      version: '1.0.0',
      description: 'Test gist',
      file: [
        {
          filename: 'test.html',
          language: 'html',
          code: '<div>Test</div>'
        }
      ]
    };

    let emittedGist: gist | null = null;
    service.gist$.subscribe(gist => emittedGist = gist);

    service.setGist(mockGist);

    expect(emittedGist).toEqual(mockGist);
  });

  it('should set file by index', async () => {
    const mockGist: gist = {
      name: 'test-gist',
      type: 'test',
      version: '1.0.0',
      description: 'Test gist',
      file: [
        {
          filename: 'test1.html',
          language: 'html',
          code: '<div>Test 1</div>'
        },
        {
          filename: 'test2.css',
          language: 'css',
          code: 'div { color: red; }'
        }
      ]
    };

    let emittedFile: file | null = null;
    service.file$.subscribe(file => emittedFile = file);

    service.setGist(mockGist);
    service.setFile(1);

    expect(emittedFile).toEqual(mockGist.file[1]);
    expect(emittedFile?.filename).toBe('test2.css');
  });

  it('should return null when file index is out of bounds', async () => {
    const mockGist: gist = {
      name: 'test-gist',
      type: 'test',
      version: '1.0.0',
      description: 'Test gist',
      file: [
        {
          filename: 'test.html',
          language: 'html',
          code: '<div>Test</div>'
        }
      ]
    };

    let emittedFile: file | null = null;
    service.file$.subscribe(file => emittedFile = file);

    service.setGist(mockGist);
    service.setFile(99);

    expect(emittedFile).toBeNull();
  });

  it('should have default font size of 16px', async () => {
    let emittedFontSize: string = '';
    service.fontsize$.subscribe(size => emittedFontSize = size);

    expect(emittedFontSize).toBe('16px');
  });

  it('should increase font size', async () => {
    let emittedFontSize: string = '';
    service.fontsize$.subscribe(size => emittedFontSize = size);

    service.increaseFontSize();

    expect(emittedFontSize).toBe('18px');

    service.increaseFontSize();

    expect(emittedFontSize).toBe('20px');
  });

  it('should decrease font size', async () => {
    let emittedFontSize: string = '';
    service.fontsize$.subscribe(size => emittedFontSize = size);

    service.decreaseFontSize();

    expect(emittedFontSize).toBe('14px');

    service.decreaseFontSize();

    expect(emittedFontSize).toBe('12px');
  });

  it('should handle multiple font size changes', async () => {
    let emittedFontSize: string = '';
    service.fontsize$.subscribe(size => emittedFontSize = size);

    service.increaseFontSize();
    service.increaseFontSize();
    service.decreaseFontSize();

    expect(emittedFontSize).toBe('18px');
  });
});
