import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { CodeRepresentationComponent } from './code-representation.component';
import { CodeRepresentationService } from '../../services/code-representation.service';
import { CodeEnum } from '../../models/code.enum';
import { gist } from '../../models/gist.interface';

describe('CodeRepresentationComponent', () => {
  let component: CodeRepresentationComponent;
  let fixture: ComponentFixture<CodeRepresentationComponent>;
  let service: CodeRepresentationService;

  const mockGist: gist = {
    name: 'test-gist',
    type: 'test',
    version: '1.0.0',
    description: 'Test gist',
    file: [
      {
        filename: 'test1.ts',
        language: 'typescript',
        code: 'const test1 = "hello";'
      },
      {
        filename: 'test2.css',
        language: 'css',
        code: '.test { color: blue; }'
      },
      {
        filename: 'test.html',
        language: 'html',
        code: '<div>Test</div>'
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeRepresentationComponent],
      providers: [
        CodeRepresentationService,
        provideZonelessChangeDetection(),
        provideHighlightOptions({
          coreLibraryLoader: () => import('highlight.js/lib/core'),
          languages: {
            typescript: () => import('highlight.js/lib/languages/typescript'),
            css: () => import('highlight.js/lib/languages/css'),
            xml: () => import('highlight.js/lib/languages/xml')
          }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CodeRepresentationComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CodeRepresentationService);
    service.setGist(mockGist);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with first file', async () => {
    expect(component.file_index).toBe(0);
  });

  it('should have CODE as default active view', async () => {
    expect(component.activeView()).toBe(CodeEnum.CODE);
  });

  it('should switch to PREVIEW view', async () => {
    component.selectView(CodeEnum.PREVIEW);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.activeView()).toBe(CodeEnum.PREVIEW);
  });

  it('should select file by index', async () => {
    component.selectFile(1);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.file_index).toBe(1);
  });

  it('should not change file if same index selected', async () => {
    component.selectFile(0);
    const currentIndex = component.file_index;
    
    component.selectFile(0);
    
    expect(component.file_index).toBe(currentIndex);
  });

  it('should update indicator on file selection', async () => {
    const updateSpy = spyOn(component, 'updateIndicator');
    
    component.selectFile(1);
    
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should set hovered tab index on hover', async () => {
    component.onTabHover(2);
    
    expect(component.hoveredTabIndex()).toBe(2);
  });

  it('should clear hovered tab index on leave', async () => {
    component.onTabHover(2);
    component.onTabLeave();
    
    expect(component.hoveredTabIndex()).toBeNull();
  });

  it('should subscribe to gist observable', async () => {
    const subscription = component.gist$.subscribe(gist => {
      if (gist) {
        expect(gist.name).toBe('test-gist');
        expect(gist.file.length).toBe(3);
      }
    });

    subscription.unsubscribe();
  });

  it('should subscribe to file observable', async () => {
    let emittedFile = null;
    component.file$.subscribe(file => emittedFile = file);

    expect(emittedFile).not.toBeNull();
  });
});
