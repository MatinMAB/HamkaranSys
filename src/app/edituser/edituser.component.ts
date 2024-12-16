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
import { editUser } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

type UserFormGroup = {
  [K in keyof editUser]: FormControl<editUser[K]>;
};
@Component({
  selector: 'app-edituser',
  imports: [ReactiveFormsModule],
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.scss',
})
export class EdituserComponent {
  constructor(
    private request: HttprequestService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  errorMessage: string = '';

  userForm: FormGroup<UserFormGroup> = new FormGroup({
    id: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
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

  ngOnInit(): void {
    this.request.getUsers().subscribe((users) => {
      const usersArr: editUser[] = Object.values(users);
      const user = usersArr.filter(
        (user: editUser) => user.id == this.activatedRoute.snapshot.params['id']
      );
      this.userForm.patchValue(user[0]);
    });
  }

  OnSubmit(): void {
    if (this.userForm.invalid) {
      this.errorMessage =
        'Please fill all required fields in valid format before submitting.';
      return;
    }
    this.request.editUser(this.userForm.getRawValue()).subscribe({
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
