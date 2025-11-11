import { TestBed } from '@angular/core/testing';

import { CodeRepresentationService } from './code-representation.service';

describe('CodeRepresentationService', () => {
  let service: CodeRepresentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeRepresentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
