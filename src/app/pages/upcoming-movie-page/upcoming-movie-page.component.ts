/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieComponent } from '../../components/movie/movie.component';
import { MovieService } from '../../services/movie.service';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-upcoming-movie-page',
  standalone: true,
  templateUrl: './upcoming-movie-page.component.html',
  styleUrl: './upcoming-movie-page.component.scss',
  imports: [HeaderComponent, MovieComponent, MovieListComponent],
})
export class UpcomingMoviePageComponent implements OnInit {
  upComingMovies: any = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.upComingMovies = this.movieService.getUpComingMovies();
  }
}
