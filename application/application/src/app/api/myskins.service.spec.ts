import { TestBed } from '@angular/core/testing';

import { MyskinsService } from './myskins.service';

describe('MyskinsService', () => {
  let service: MyskinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyskinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
