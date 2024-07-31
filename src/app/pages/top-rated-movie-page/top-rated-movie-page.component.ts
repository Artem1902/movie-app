/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie.model';
import { MovieComponent } from '../../components/movie/movie.component';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-rated-movie-page',
  standalone: true,
  templateUrl: './top-rated-movie-page.component.html',
  styleUrl: './top-rated-movie-page.component.scss',
  imports: [HeaderComponent, MovieListComponent, MovieComponent],
})
export class TopRatedMoviePageComponent implements OnInit, OnDestroy {
  topRatedMovies: Movie[] | null = null;
  private subscription: Subscription | undefined;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getTopRatedMovies().subscribe((data) => {
      this.topRatedMovies = data.results;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
