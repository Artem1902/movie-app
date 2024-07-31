/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites-movie-page',
  standalone: true,
  templateUrl: './favorites-movie-page.component.html',
  styleUrl: './favorites-movie-page.component.scss',
  imports: [MovieListComponent],
})
export class FavoritesMoviePageComponent implements OnInit, OnDestroy {
  favoritesMovies: Movie[] | null = null;
  private subscription: Subscription | undefined;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.subscription = this.movieService.favoriteMoviesList$.subscribe(
      (data) => (this.favoritesMovies = data),
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
