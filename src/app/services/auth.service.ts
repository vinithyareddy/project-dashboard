// auth.service.ts — updated with registerWithProfile method for name + phone
import { Injectable, NgZone } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private inactivityTimer: any;
  private readonly INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

  constructor(private auth: Auth, private ngZone: NgZone) {
    onAuthStateChanged(this.auth, user => {
      this.userSubject.next(user);
      if (user) {
        this.resetInactivityTimer();
      } else {
        this.clearInactivityTimer();
      }
    });

    this.startInactivityWatch();
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string, name: string, phone: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(async ({ user }) => {
      await updateProfile(user, {
        displayName: name,
        photoURL: phone // Using photoURL to store phone temporarily
      });
      this.userSubject.next(user);
    });
  }

  // ✅ Add this method to support registerWithProfile used in auth.component.ts
  registerWithProfile({ name, phone, email, password }: { name: string; phone: string; email: string; password: string }) {
    return this.register(email, password, name, phone);
  }

  updateUserPassword(currentPassword: string, newPassword: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user || !user.email) {
      return Promise.reject('No user is currently logged in');
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    return reauthenticateWithCredential(user, credential).then(() => {
      return updatePassword(user, newPassword);
    });
  }

  logout() {
    this.clearInactivityTimer();
    return signOut(this.auth);
  }

  private startInactivityWatch() {
    ['mousemove', 'keydown', 'click'].forEach(event => {
      window.addEventListener(event, () => this.resetInactivityTimer());
    });
  }

  private resetInactivityTimer() {
    this.clearInactivityTimer();
    this.inactivityTimer = setTimeout(() => {
      this.ngZone.run(() => {
        this.logout();
        alert('You were logged out due to inactivity.');
      });
    }, this.INACTIVITY_LIMIT);
  }

  private clearInactivityTimer() {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }
  }
}
