/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie.model';
import { MovieComponent } from '../../components/movie/movie.component';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-popular-movie-page',
  standalone: true,
  templateUrl: './popular-movie-page.component.html',
  styleUrl: './popular-movie-page.component.scss',
  imports: [HeaderComponent, MovieListComponent, MovieComponent],
})
export class PopularMoviePageComponent implements OnInit {
  popularMovies: Movie[] | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe((data) => {
      this.popularMovies = data.results;
    });
  }
}
