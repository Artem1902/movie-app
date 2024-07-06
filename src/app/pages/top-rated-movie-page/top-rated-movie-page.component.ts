/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieComponent } from '../../components/movie/movie.component';
import { MovieService } from '../../services/movie.service';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-top-rated-movie-page',
  standalone: true,
  templateUrl: './top-rated-movie-page.component.html',
  styleUrl: './top-rated-movie-page.component.scss',
  imports: [HeaderComponent, MovieComponent, MovieListComponent],
})
export class TopRatedMoviePageComponent implements OnInit {
  topRatedMovies: any = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.topRatedMovies = this.movieService.getTopRatedMovies();
  }
}
