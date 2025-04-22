import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    return this.authService.getUser().pipe(
      take(1),
      map(user => {
        if (user) return true;
        this.router.navigate(['/auth']);
        return false;
      })
    );
  }
}