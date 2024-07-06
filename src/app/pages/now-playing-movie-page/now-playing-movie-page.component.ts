/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MovieComponent } from '../../components/movie/movie.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-now-playing-movie-page',
  standalone: true,
  templateUrl: './now-playing-movie-page.component.html',
  styleUrl: './now-playing-movie-page.component.scss',
  imports: [MovieComponent, HeaderComponent, MovieListComponent],
})
export class NowPlayingMoviePageComponent implements OnInit {
  nowPlayingMovies: any = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.nowPlayingMovies = this.movieService.getNowPlayingMovies();
  }
}
