import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { first, last, merge } from 'rxjs';
import { RouterLink } from '@angular/router';
import { sha256 } from 'js-sha256';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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
export class RegisterComponent {
  registerForm: FormGroup;

  errorMessage = signal({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });

    // update error message when form value status changes
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
    return this.registerForm.get('email');
  }

  get password(): any {
    return this.registerForm.get('password');
  }

  get firstName(): any {
    return this.registerForm.get('firstName');
  }

  get lastName(): any {
    return this.registerForm.get('lastName');
  }

  // updating error message based on form value status
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set({
        ...this.errorMessage(),
        email: 'Email is required',
      });
    } else if (this.email.hasError('email')) {
      this.errorMessage.set({
        ...this.errorMessage(),
        email: 'Invalid email',
      });
    }
    if (this.password.hasError('required')) {
      this.errorMessage.set({
        ...this.errorMessage(),
        password: 'Password is required',
      });
    } else if (this.password.hasError('minlength')) {
      this.errorMessage.set({
        ...this.errorMessage(),
        password: 'Password must be at least 6 characters',
      });
    } else if (this.password.hasError('maxlength')) {
      this.errorMessage.set({
        ...this.errorMessage(),
        password: 'Password must be at most 20 characters',
      });
    }
    if (this.firstName.hasError('required')) {
      this.errorMessage.set({
        ...this.errorMessage(),
        firstName: 'First Name is required',
      });
    }
    if (this.lastName.hasError('required')) {
      this.errorMessage.set({
        ...this.errorMessage(),
        lastName: 'Last Name is required',
      });
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('register submitted', this.registerForm.value);
      this.handleSignUp();
    } else {
      console.log(this.registerForm.get('email')?.errors);
    }
  }

  handleSignUp() {
    const stringToHash = this.email + this.password;
    const hashedString = sha256(stringToHash);
    let isUserExist = false;
    this.http.get<any>(`http://localhost:3000/user`).subscribe({
      next: (response) => {
        response?.forEach((element: any) => {
          if (
            element.email === this.email.value ||
            element.password === this.password.value
          ) {
            console.log('hello', element.id);
            isUserExist = true;
            return;
          }
          if (isUserExist) {
            console.log('why not coming');
            alert('User already exist');
          } else {
            this.http
              .post<any>(`http://localhost:3000/user`, {
                email: this.email.value,
                firstName: this.lastName.value,
                lastName: this.firstName.value,
                password: this.password.value,
                id: hashedString,
              })
              .subscribe({
                next: (response) => {
                  console.log(response);
                },
                error: (error) => {
                  console.error(error);
                },
              });
          }
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
