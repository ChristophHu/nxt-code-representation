import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewRenderer } from './preview-renderer';

describe('PreviewRenderer', () => {
  let component: PreviewRenderer;
  let fixture: ComponentFixture<PreviewRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewRenderer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
