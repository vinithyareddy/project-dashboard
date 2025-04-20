import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatCheckboxModule } from '@angular/material/checkbox';



@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  
  imports: [
    CommonModule,
    MatCheckboxModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule
  ],
  providers: [AuthService]
  
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isRegisterMode = false;
  errorMsg = '';
  showPassword = false;
  showConfirm = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      name: [''],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]], // 👈 only required in login/register flow
      confirmPassword: [''],
      rememberMe: [false] // 👈 add this line

    });
  }

  ngOnInit(): void {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.authForm.get('email')?.setValue(rememberedEmail);
      this.authForm.get('rememberMe')?.setValue(true);
    }
  
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMsg = '';
    this.authForm.get('password')?.reset();
    this.authForm.get('confirmPassword')?.reset();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmVisibility() {
    this.showConfirm = !this.showConfirm;
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    const email = this.authForm.get('email')?.value;
    console.log('📩 Forgot password triggered with email:', email); // <-- add this
  
    if (!email) {
      this.errorMsg = '❌ Please enter your email to reset password';
      return;
    }
  
    this.authService.sendPasswordResetEmail(email)
      .then(() => {
        this.errorMsg = '✅ Password reset link sent to your email';
      })
      .catch((err) => {
        const errorCode = err.code || '';
        switch (errorCode) {
          case 'auth/invalid-email':
            this.errorMsg = '❌ Invalid email format';
            break;
          case 'auth/user-not-found':
            this.errorMsg = '❌ Email not found';
            break;
          default:
            this.errorMsg = '❌ Failed to send reset email';
        }
      });
  }
  

  async onSubmit() {
    const { name, phone, email, password, confirmPassword } = this.authForm.value;

    if (!email) {
      this.errorMsg = '❌ Email is required';
      return;
    }

    // Register Flow
    if (this.isRegisterMode) {
      if (!password || password.length < 6) {
        this.errorMsg = '❌ Password must be at least 6 characters';
        return;
      }

      if (password !== confirmPassword) {
        this.errorMsg = '❌ Passwords do not match';
        return;
      }

      try {
        await this.authService.registerWithProfile({ name, phone, email, password });
        this.errorMsg = '✅ Account has been created';
        this.router.navigate(['/dashboard']);
      } catch (err: any) {
        this.handleFirebaseError(err);
      }

      return;
    }

    // Login Flow
    if (!password) {
      this.errorMsg = '❌ Password is required';
      return;
    }

    try {
      await this.authService.login(email, password);
        // ✅ Remember Me Logic
  const remember = this.authForm.get('rememberMe')?.value;
  if (remember) {
    localStorage.setItem('rememberedEmail', email);
  } else {
    localStorage.removeItem('rememberedEmail');
  }


      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.handleFirebaseError(err);
    }
  }

  private handleFirebaseError(err: any) {
    const errorCode = err.code || '';
    switch (errorCode) {
      case 'auth/invalid-login-credentials':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        this.errorMsg = '❌ Invalid Credentials';
        break;
      case 'auth/email-already-in-use':
        this.errorMsg = '❌ Email already in use';
        break;
      case 'auth/too-many-requests':
        this.errorMsg = '❌ Too many attempts. Try again later.';
        break;
      default:
        this.errorMsg = err.message || '❌ An unexpected error occurred';
    }
  }
}
