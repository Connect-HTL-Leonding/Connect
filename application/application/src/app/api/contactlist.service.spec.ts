import { TestBed } from '@angular/core/testing';

import { ContactlistService } from './contactlist.service';

describe('ContactlistService', () => {
  let service: ContactlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
