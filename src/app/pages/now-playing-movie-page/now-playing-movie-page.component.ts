/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie.model';
import { MovieComponent } from '../../components/movie/movie.component';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-now-playing-movie-page',
  standalone: true,
  templateUrl: './now-playing-movie-page.component.html',
  styleUrl: './now-playing-movie-page.component.scss',
  imports: [HeaderComponent, MovieListComponent, MovieComponent],
})
export class NowPlayingMoviePageComponent implements OnInit, OnDestroy {
  nowPlayingMovies: Movie[] | null = null;
  private subscription: Subscription | undefined;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getNowPlayingMovies().subscribe((data) => {
      this.nowPlayingMovies = data.results;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
