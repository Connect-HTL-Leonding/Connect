import { TestBed } from '@angular/core/testing';

import { AppAuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AppAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AppAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
