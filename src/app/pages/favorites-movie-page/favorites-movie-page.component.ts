/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-favorites-movie-page',
  standalone: true,
  templateUrl: './favorites-movie-page.component.html',
  styleUrl: './favorites-movie-page.component.scss',
  imports: [MovieListComponent],
})
export class FavoritesMoviePageComponent implements OnInit {
  favoritesMovies: any = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.favoritesMovies = this.movieService.getFavoriteMovies();
  }
}
