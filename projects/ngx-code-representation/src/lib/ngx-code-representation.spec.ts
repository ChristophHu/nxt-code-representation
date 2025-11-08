import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCodeRepresentation } from './ngx-code-representation';

describe('NgxCodeRepresentation', () => {
  let component: NgxCodeRepresentation;
  let fixture: ComponentFixture<NgxCodeRepresentation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCodeRepresentation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxCodeRepresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
