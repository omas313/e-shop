import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './user.guard';

describe('UserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
