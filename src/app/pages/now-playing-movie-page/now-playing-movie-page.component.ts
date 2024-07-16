/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie.model';
import { MovieComponent } from '../../components/movie/movie.component';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-now-playing-movie-page',
  standalone: true,
  templateUrl: './now-playing-movie-page.component.html',
  styleUrl: './now-playing-movie-page.component.scss',
  imports: [HeaderComponent, MovieListComponent, MovieComponent],
})
export class NowPlayingMoviePageComponent implements OnInit {
  nowPlayingMovies: Movie[] | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getNowPlayingMovies().subscribe((data) => {
      this.nowPlayingMovies = data.results;
    });
  }
}
