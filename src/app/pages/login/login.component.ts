import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;

  errorMessage = signal({
    email: '',
    password: '',
  });
  constructor(
    private fb: FormBuilder,
    private auth: AuthenticateService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });

    merge(
      this.email.statusChanges,
      this.email.valueChanges,
      this.password.statusChanges,
      this.password.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  navigateToRegister() {
    this.router.navigate(['/authentication/register']);
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const userData = await this.auth.login(
          this.email.value,
          this.password.value
        );

        this._snackBar.open('Login successful', '', {
          duration: 2000,
        });
        localStorage.setItem('token', userData.id);
        localStorage.setItem('user', JSON.stringify(userData));
        this.loginForm.reset();
        this.router.navigate(['/home/event-list']);
      } catch (error) {
        let snackBarRef = this._snackBar.open('User not found', 'sign up', {
          duration: 3000,
        });
        snackBarRef.onAction().subscribe(() => {
          this.navigateToRegister();
        });
      }
    } else {
      this._snackBar.open('Please fill in the form', 'Close');
    }
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set({
        email: 'Email is required',
        password: this.errorMessage().password,
      });
    } else if (this.email.hasError('email')) {
      this.errorMessage.set({
        email: 'Invalid email',
        password: this.errorMessage().password,
      });
    }
    if (this.password.hasError('required')) {
      this.errorMessage.set({
        email: this.errorMessage().email,
        password: 'Password is required',
      });
    } else if (this.password.hasError('minlength')) {
      this.errorMessage.set({
        email: this.errorMessage().email,
        password: 'Password must be at least 6 characters',
      });
    } else if (this.password.hasError('maxlength')) {
      this.errorMessage.set({
        email: this.errorMessage().email,
        password: 'Password must be at most 20 characters',
      });
    }
  }
}
