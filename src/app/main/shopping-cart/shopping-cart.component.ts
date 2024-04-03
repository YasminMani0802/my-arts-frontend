import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/main/http.service';
import { UtilityService } from 'src/app/utility.service';
import { Product } from '../product.interface';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  shoppingCart: Product[] = [];
  searchVal: string = '';
  public url = environment.apiUrl;

  constructor(private http: HttpService, public utility: UtilityService, private router: Router) { }

  ngOnInit() {
    const sub = this.http.get<Product[]>('products/shopping-cart').subscribe({
      next: (products) => {
        this.shoppingCart = products;
      },
      error: (res) => console.log(res.error)

    })
  }

  removeFromShoppingCart(product_id: string) {
    const sub = this.http.delete<Product[]>(`products/remove-from-shopping-cart?product_id=${product_id}`).subscribe({
      next: (shoppingCart) => {
        this.shoppingCart = shoppingCart;

      },
      error: (res) => console.log(res.error)

    })
  }

  goToArtistPage(artistName: string) {
    localStorage.setItem('artistName', artistName);
    this.router.navigate(['main/artist-page']);
  }
}
