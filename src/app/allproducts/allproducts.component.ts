import { Component } from '@angular/core';
import { HttprequestService } from '../services/httprequest.service';
import { RouterModule } from '@angular/router';
import { editProduct } from '../models/user.model';

@Component({
  selector: 'app-allproducts',
  imports: [RouterModule],
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.scss',
})
export class AllproductsComponent {
  constructor(private request: HttprequestService) {}

  products: editProduct[] = [];
  errorMessage: string = '';

  ngOnInit(): void {
    this.request.getProducts().subscribe({
      next: (products) => {
        this.products = Object.values(products);
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }
}
