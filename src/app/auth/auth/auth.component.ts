import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule
  ],
  providers: [AuthService] // ✅ Add this line to fix injection error
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMsg = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmVisibility() {
    this.showConfirm = !this.showConfirm;
  }

  async onSubmit() {
    if (this.authForm.invalid) return;

    const { name, phone, email, password, confirmPassword } = this.authForm.value;

    if (this.isRegisterMode && password !== confirmPassword) {
      this.errorMsg = '❌ Passwords do not match';
      return;
    }

    try {
      if (this.isRegisterMode) {
        await this.authService.registerWithProfile({ name, phone, email, password });
        this.errorMsg = '✅ Account has been created';
      } else {
        await this.authService.login(email, password);
      }
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
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
}
