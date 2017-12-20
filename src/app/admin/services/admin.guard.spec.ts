import { inject, TestBed, async, fakeAsync } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { AuthService } from 'shared/services/auth.service';
import { Observable } from 'rxjs/Observable';

class AuthServiceStub {
  get appUser$() { return null; }
}

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AuthService, useClass: AuthServiceStub}
      ]
    });
  });

  it('should be valid', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return Observable of false when canActivate is called for a non-admin', () => {
    const authService = TestBed.get(AuthService);
    const guard: AdminGuard = TestBed.get(AdminGuard);
    const spy = spyOnProperty(authService, 'appUser$', 'get').and.returnValue(Observable.from([{}]));

    guard.canActivate(null, null).subscribe(v => {
      expect(v).toBeFalsy();
    });
  });

  it('should return Observable of true when canActivate is called for an admin', () => {
    const authService = TestBed.get(AuthService);
    const guard: AdminGuard = TestBed.get(AdminGuard);
    const spy = spyOnProperty(authService, 'appUser$', 'get').and
      .returnValue(Observable.from([{ isAdmin: true }]));

    guard.canActivate(null, null).subscribe(v => {
      expect(v).toBeTruthy();
    });
  });

});
