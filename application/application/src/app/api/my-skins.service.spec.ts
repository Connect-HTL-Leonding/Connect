import { TestBed } from '@angular/core/testing';

import { MySkinsService } from './my-skins.service';

describe('MySkinsService', () => {
  let service: MySkinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySkinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
