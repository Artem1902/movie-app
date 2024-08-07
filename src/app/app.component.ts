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
  ) {}

  ngOnInit(): void {
    this.authService.authenticateAndGetAccountId().subscribe(
      ({ accountId, sessionId }) => {
        this.movieService.setAccountId(accountId);
        this.movieService.setSessionId(sessionId);
        console.log('Account ID:', accountId);
        console.log('Session ID:', sessionId);
      },
      (error) => {
        console.error('Authentication failed:', error);
      },
    );
  }
}
