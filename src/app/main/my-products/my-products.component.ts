import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/main/http.service';
import { UtilityService } from 'src/app/utility.service';
import { Product } from '../product.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent {
  myProducts: Product[] = [];
  searchVal: string = '';
  public url = environment.apiUrl;
  constructor(private http: HttpService, public utility: UtilityService, private router: Router) { }

  ngOnInit() {
    const sub = this.http.get<Product[]>('products/my-products').subscribe({
      next: (products) => {
        this.myProducts = products;
        sub.unsubscribe();
      },
      error: (res) => console.log(res.error)

    })
  }

  handleDelete(product_id: string) {
    const isConfirm = confirm('Are you sure you wants to delete this product?');
    if (isConfirm) {
      const sub = this.http.delete<Product[]>(`products/delete-one?product_id=${product_id}`).subscribe({
        next: (products) => {
          this.myProducts = products;
          sub.unsubscribe();

        },
        error: (res) => console.log(res.error)

      })
    }
  }

  handleUpdate(product: Product) {

    this.utility.product = product;

    this.router.navigate(['main/my-products/update']);
  }

  goToArtistPage(artistName: string) {
    localStorage.setItem('artistName', artistName);
    this.router.navigate(['main/artist-page']);
  }
}
