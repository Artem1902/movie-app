/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from '../movie/movie.component';

import { movies } from '../../movies';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  moviesList = movies;
  favoritesMoviesList: any[] = [];
  watchingMoviesList: any[] = [];

  handleChangeFavorite(data: any) {
    const newFavoriteMovie = data;
    const findedMovie = this.favoritesMoviesList.find(
      (el) => el.id === newFavoriteMovie.id,
    );
    if (findedMovie) {
      this.favoritesMoviesList = this.favoritesMoviesList.filter(
        (el) => el.id !== newFavoriteMovie.id,
      );
    } else this.favoritesMoviesList.push(newFavoriteMovie);
  }

  handleChangeWatching(data: any) {
    const newWatchingMovie = data;

    const findedMovie = this.watchingMoviesList.find(
      (el) => el.id === newWatchingMovie.id,
    );
    if (findedMovie) {
      this.watchingMoviesList = this.watchingMoviesList.filter(
        (el) => el.id !== newWatchingMovie.id,
      );
    } else this.watchingMoviesList.push(newWatchingMovie);
  }
}
