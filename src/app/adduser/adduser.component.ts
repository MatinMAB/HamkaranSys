import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { nationalCodeValidator } from '../validators/validators.nationalcode';
import { mobileNumberValidator } from '../validators/validators.mobilenumber';
import { HttprequestService } from '../services/httprequest.service';
import { addUser } from '../models/user.model';
import { Router } from '@angular/router';

type UserFormGroup = {
  [K in keyof addUser]: FormControl<addUser[K]>;
};

@Component({
  selector: 'app-adduser',
  imports: [ReactiveFormsModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss',
})
export class AdduserComponent {
  constructor(private request: HttprequestService, private router: Router) {}

  errorMessage: string = '';

  userForm: FormGroup<UserFormGroup> = new FormGroup({
    firstName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    role: new FormControl<string>("0", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    nationalCode: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, nationalCodeValidator()],
    }),
    mobile: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, mobileNumberValidator()],
    }),
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  OnSubmit(): void {
    if (this.userForm.invalid) {
      this.errorMessage =
        'Please fill all required fields in valid format before submitting.';
      return;
    }
    this.request.createUser(this.userForm.getRawValue()).subscribe({
      next: (message) => {
        this.router.navigate(['all-users']);
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });

  }
}
