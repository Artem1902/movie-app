import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
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
    if (newFavoriteMovie && newFavoriteMovie.favorite) {
      this.favoritesMoviesList.push(newFavoriteMovie);
    } else if (newFavoriteMovie && !newFavoriteMovie.favorite) {
      this.favoritesMoviesList = this.favoritesMoviesList.filter(
        (el) => el.id !== newFavoriteMovie.id
      );
    } else throw new Error('Error message!');
  }
  handleChangeWatching(data: any) {
    const newWatchingMovie = data;
    if (newWatchingMovie && newWatchingMovie.isInWatchingList) {
      this.watchingMoviesList.push(newWatchingMovie);
    } else if (newWatchingMovie && !newWatchingMovie.isInWatchingList) {
      this.watchingMoviesList = this.watchingMoviesList.filter(
        (el) => el.id !== newWatchingMovie.id
      );
    } else throw new Error('Error message!');
  }
}
