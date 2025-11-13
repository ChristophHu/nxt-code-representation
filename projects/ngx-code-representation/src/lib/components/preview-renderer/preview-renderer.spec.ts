import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviewRenderer } from './preview-renderer';
import { gist } from '../../models/gist.interface';

describe('PreviewRenderer', () => {
  let component: PreviewRenderer;
  let fixture: ComponentFixture<PreviewRenderer>;

  const mockGist: gist = {
    name: 'test-gist',
    type: 'test',
    version: '1.0.0',
    description: 'Test gist',
    file: [
      {
        filename: 'test.html',
        language: 'html',
        code: '<div class="test-div">Test Content</div>'
      },
      {
        filename: 'test.css',
        language: 'css',
        code: '.test-div { color: blue; font-size: 20px; }'
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewRenderer],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewRenderer);
    component = fixture.componentInstance;
    component.gist = mockGist;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  // it('should render HTML content', async () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   const rendererElement = compiled.querySelector('[data-testid="element-renderer"]');
    
  //   expect(rendererElement).toBeTruthy();
  //   expect(rendererElement?.innerHTML).toContain('Test Content');
  // });

  // it('should apply CSS styles', async () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   const rendererElement = compiled.querySelector('[data-testid="element-renderer"]');
  //   const styleElement = rendererElement?.querySelector('style');
    
  //   expect(styleElement).toBeTruthy();
  //   expect(styleElement?.textContent).toContain('.test-div');
  //   expect(styleElement?.textContent).toContain('color: blue');
  // });

  // it('should inject style element as first child', async () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   const rendererElement = compiled.querySelector('[data-testid="element-renderer"]');
  //   const firstChild = rendererElement?.firstChild;
    
  //   expect(firstChild?.nodeName).toBe('STYLE');
  // });

  // it('should update content when gist changes', async () => {
  //   const newGist: gist = {
  //     name: 'new-gist',
  //     type: 'test',
  //     version: '1.0.0',
  //     description: 'New gist',
  //     file: [
  //       {
  //         filename: 'new.html',
  //         language: 'html',
  //         code: '<p>New Content</p>'
  //       },
  //       {
  //         filename: 'new.css',
  //         language: 'css',
  //         code: 'p { color: red; }'
  //       }
  //     ]
  //   };

  //   component.gist = newGist;
  //   component.ngAfterViewInit();
  //   fixture.detectChanges();
  //   await fixture.whenStable();

  //   const compiled = fixture.nativeElement as HTMLElement;
  //   const rendererElement = compiled.querySelector('[data-testid="element-renderer"]');
    
  //   expect(rendererElement?.innerHTML).toContain('New Content');
  // });

  it('should use default placeholder gist if no gist provided', async () => {
    const defaultFixture = TestBed.createComponent(PreviewRenderer);
    const defaultComponent = defaultFixture.componentInstance;
    defaultFixture.detectChanges();
    await defaultFixture.whenStable();

    expect(defaultComponent.gist.name).toBe('Placeholder Gist');
    expect(defaultComponent.gist.file.length).toBeGreaterThan(0);
  });

  it('should handle gist without HTML file', async () => {
    const gistWithoutHTML: gist = {
      name: 'no-html',
      type: 'test',
      version: '1.0.0',
      description: 'No HTML',
      file: [
        {
          filename: 'test.css',
          language: 'css',
          code: 'div { color: green; }'
        }
      ]
    };

    component.gist = gistWithoutHTML;
    component.ngAfterViewInit();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component).toBeTruthy();
  });
});
