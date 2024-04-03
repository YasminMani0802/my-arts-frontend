import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { Product } from "./main/product.interface";
import { HttpService } from "./main/http.service";
import { Router } from "@angular/router";
import { AuthenticateStatus } from "./authenticateStatus.interface";

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  isLoggedIn$ = new BehaviorSubject<any>(false);
  loggedInUser: { name: string, userImage: string };
  isArtist: boolean | null = null;
  product: Product;



  constructor(private http: HttpService, private router: Router) {
  }


  ngOnInit() { }

  login(credentials: { email: string, password: string }) {

    return this.http.post<AuthenticateStatus>(`users/login`, { ...credentials }).pipe(
      tap(({ authenticated, userName, isArtist, userImage }) => {
        this.isLoggedIn$.next(authenticated);
        this.loggedInUser = { name: userName, userImage };
        this.isArtist = isArtist;


      })
    );

  }

  checkAuth() {
    return this.http.get<AuthenticateStatus>('users/is-signed-in').pipe(
      tap(({ authenticated, userName, isArtist, userImage }) => {
        this.isArtist = isArtist;
        this.loggedInUser = { name: userName, userImage };
        this.isLoggedIn$.next(authenticated);
        if (this.isLoggedIn$.value === false) {

        }
      })
    );
  }

  logout() {


    return this.http.delete(`users/logout`).pipe(
      tap(() => {
        this.isLoggedIn$.next(false);
        this.isArtist = null;

      })
    );


  }

}