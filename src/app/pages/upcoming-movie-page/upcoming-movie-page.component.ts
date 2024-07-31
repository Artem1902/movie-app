/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie.model';
import { MovieComponent } from '../../components/movie/movie.component';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upcoming-movie-page',
  standalone: true,
  templateUrl: './upcoming-movie-page.component.html',
  styleUrl: './upcoming-movie-page.component.scss',
  imports: [HeaderComponent, MovieListComponent, MovieComponent],
})
export class UpcomingMoviePageComponent implements OnInit, OnDestroy {
  upComingMovies: Movie[] | null = null;
  private subscription: Subscription | undefined;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getUpComingMovies().subscribe((data) => {
      this.upComingMovies = data.results;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
