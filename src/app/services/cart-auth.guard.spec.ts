import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cartAuthGuard } from './cart-auth.guard';

describe('cartAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cartAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
