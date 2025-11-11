import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeRenderer } from './code-renderer';

describe('CodeRenderer', () => {
  let component: CodeRenderer;
  let fixture: ComponentFixture<CodeRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeRenderer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
