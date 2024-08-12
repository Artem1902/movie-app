import { Component, OnInit } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import { MovieService } from './services/movie.service';
import { Store } from '@ngrx/store';
import { loadFavoritesMovies, loadWatchLaterMovies } from './store/actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RouterModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private movieService: MovieService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.authService.authenticateAndGetAccountId().subscribe(
      ({ accountId, sessionId }) => {
        this.movieService.setAccountId(accountId);
        this.movieService.setSessionId(sessionId);

        if (accountId && sessionId) {
          this.store.dispatch(loadFavoritesMovies());
          this.store.dispatch(loadWatchLaterMovies());
        }
      },
      (error) => {
        console.error('Authentication failed:', error);
      },
    );
  }
}
