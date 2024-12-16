import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { editProduct } from '../models/user.model';
import { HttprequestService } from '../services/httprequest.service';
import { ActivatedRoute, Router } from '@angular/router';

type ProductFormGroup = {
  [K in keyof editProduct]: FormControl<editProduct[K]>;
};
@Component({
  selector: 'app-editproduct',
  imports: [ReactiveFormsModule],
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.scss',
})
export class EditproductComponent {
  constructor(
    private request: HttprequestService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  errorMessage: string = '';

  productForm: FormGroup<ProductFormGroup> = new FormGroup({
    id: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
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

  ngOnInit(): void {
    this.request.getProducts().subscribe({
      next: (products) => {
        const productsArr: editProduct[] = Object.values(products);
        const product = productsArr.filter(
          (product: editProduct) =>
            product.id == this.activatedRoute.snapshot.params['id']
        );
        this.productForm.patchValue(product[0]);
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }

  OnSubmit(): void {
    if (this.productForm.invalid) {
      this.errorMessage =
        'Please fill all required fields in valid format before submitting.';
      return;
    }

    this.request.editProduct(this.productForm.getRawValue()).subscribe({
      next: (response) => {
        this.router.navigate(['all-products']);
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }
}
