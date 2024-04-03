import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { UtilityService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn$: BehaviorSubject<boolean | null>;


  constructor(public utility: UtilityService) {

  }
  ngOnInit() {

    this.isLoggedIn$ = this.utility.isLoggedIn$;

    const sub = this.utility.checkAuth().subscribe({
      next: () => {
        console.log({ isLoggedIn: this.utility.isLoggedIn$.value, isArtist: this.utility.isArtist, loggedInUser: this.utility.loggedInUser });
        sub.unsubscribe();
      }
    })
  }



}
