import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttprequestService } from '../services/httprequest.service';
import { loginUser } from '../models/user.model';
import { AuthService } from '../services/auth.service';

type UserFormGroup = {
  [K in keyof loginUser]: FormControl<loginUser[K]>;
};

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private request: HttprequestService,
    private authService: AuthService
  ) {}

  errorMessage: string = '';

  loginForm: FormGroup<UserFormGroup> = new FormGroup({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  OnClick(): void {
    if (this.loginForm.invalid) {
      this.errorMessage =
        'Please fill all required fields in valid format before submitting.';
      return;
    }
    this.request.login(this.loginForm.getRawValue()).subscribe({
      next: ({ sessionId }) => {
        localStorage.setItem(
          'currentUser',
          JSON.stringify({ token: sessionId })
        );
        this.authService.login();
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }
}
