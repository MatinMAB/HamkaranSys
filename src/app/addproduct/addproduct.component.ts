import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { addProduct } from '../models/user.model';
import { HttprequestService } from '../services/httprequest.service';
import { Router } from '@angular/router';


type ProductFormGroup = {
  [K in keyof addProduct]: FormControl<addProduct[K]>;
};

@Component({
  selector: 'app-addproduct',
  imports: [ReactiveFormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss',
})
export class AddproductComponent {
  constructor(private request: HttprequestService, private router: Router) {}

  errorMessage: string = '';

  productForm: FormGroup<ProductFormGroup> = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    code: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    weight: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  OnSubmit(): void {
    if (this.productForm.invalid) {
      this.errorMessage =
        'Please fill all required fields in valid format before submitting.';
      return;
    }

    this.request.createProduct(this.productForm.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['all-products']);
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message; // Display error message
      },
    });
  }
}
