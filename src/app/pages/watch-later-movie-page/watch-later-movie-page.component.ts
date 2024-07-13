/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-watch-later-movie-page',
  standalone: true,
  templateUrl: './watch-later-movie-page.component.html',
  styleUrl: './watch-later-movie-page.component.scss',
  imports: [MovieListComponent],
})
export class WatchLaterMoviePageComponent implements OnInit {
  watchLaterMovies: any = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.watchLaterMovies = this.movieService.getWatchLater();
  }
}
