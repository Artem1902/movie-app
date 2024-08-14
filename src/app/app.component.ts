import { Component, OnInit } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Store } from '@ngrx/store';
import { loadFavoritesMovies, loadWatchLaterMovies } from './store/movieStore/actions';
import {tokenRequest} from "./store/authStore/actions";
import {selectAccountId, selectSessionId} from "./store/authStore/selectors";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
  ) {}

  sessionId$ = this.store.select(selectSessionId);
  accountId$ = this.store.select(selectAccountId);


  ngOnInit(): void {
    this.store.dispatch(tokenRequest());

    combineLatest([this.sessionId$, this.accountId$]).subscribe(([sessionId, accountId]) => {
      if (sessionId && accountId) {
        this.store.dispatch(loadFavoritesMovies());
        this.store.dispatch(loadWatchLaterMovies());
      }
    });
  }
}


