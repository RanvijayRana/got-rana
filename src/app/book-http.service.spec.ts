import { TestBed, inject } from '@angular/core/testing';

import { BookHttpService } from './book-http.service';

describe('BookHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookHttpService]
    });
  });

  it('should be created', inject([BookHttpService], (service: BookHttpService) => {
    expect(service).toBeTruthy();
  }));
});
