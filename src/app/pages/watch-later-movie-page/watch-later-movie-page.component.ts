/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-watch-later-movie-page',
  standalone: true,
  templateUrl: './watch-later-movie-page.component.html',
  styleUrl: './watch-later-movie-page.component.scss',
  imports: [MovieListComponent],
})
export class WatchLaterMoviePageComponent implements OnInit, OnDestroy {
  watchLaterMovies: Movie[] | null = null;
  private subscription: Subscription | undefined;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.watchLaterMoviesList$.subscribe(
      (data) => (this.watchLaterMovies = data),
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
