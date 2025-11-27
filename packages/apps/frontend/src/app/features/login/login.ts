/* eslint-disable @typescript-eslint/unbound-method */
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppRoutes } from '../../app.routes';
import { AuthService } from '../../services/auth.service';

interface LoginForm {
  identifier: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  readonly R = AppRoutes;
  readonly componentTitle = this.R.LOGIN.title;
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly loginForm: FormGroup<LoginForm> = this.formBuilder.group({
    identifier: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor() {
    // For demo purposes, pre-fill the form with default credentials.
    this.loginForm.setValue({ identifier: 'user1', password: 'user123' });
  }

  /**
   * Handles the form submission by calling the AuthService.
   */
  async onSubmit(): Promise<void> {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    try {
      const { identifier, password } = this.loginForm.getRawValue();
      await this.authService.login(identifier, password);
    } catch (error: unknown) {
      this.errorMessage.set('Invalid credentials. Please try again.');
      console.error('Login failed:', error);
    } finally {
      this.loading.set(false);
    }
  }

  protected isFieldInvalid(fieldName: keyof LoginForm): boolean {
    const control = this.loginForm.get(fieldName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
