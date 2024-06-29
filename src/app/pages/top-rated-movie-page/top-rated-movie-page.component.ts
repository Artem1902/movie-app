/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { topRatedMovies } from '../../mock-data';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieComponent } from '../../components/movie/movie.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-rated-movie-page',
  standalone: true,
  imports: [HeaderComponent, MovieComponent],
  templateUrl: './top-rated-movie-page.component.html',
  styleUrl: './top-rated-movie-page.component.scss',
})
export class TopRatedMoviePageComponent {
  constructor(private router: Router) {}

  movieList = topRatedMovies;

  favoriteMovieListIds: string[] = [];
  watchLaterMovieListIds: string[] = [];

  handleChangeFavorite(data: any) {
    const newFavoriteMovieId = data.id;
    const findedMovie = this.favoriteMovieListIds.find(
      (el) => el === newFavoriteMovieId,
    );
    if (findedMovie) {
      this.favoriteMovieListIds = this.favoriteMovieListIds.filter(
        (el) => el !== newFavoriteMovieId,
      );
    } else this.favoriteMovieListIds.push(newFavoriteMovieId);
  }
  handleChangeWatching(data: any) {
    const newWatchingMovieId = data.id;
    const findedMovie = this.watchLaterMovieListIds.find(
      (el) => el === newWatchingMovieId,
    );
    if (findedMovie) {
      this.watchLaterMovieListIds = this.watchLaterMovieListIds.filter(
        (el) => el !== newWatchingMovieId,
      );
    } else this.watchLaterMovieListIds.push(newWatchingMovieId);
  }
  handleNavigateToDetailsPage(id: string) {
    this.router.navigate([`movie/${id}`]);
  }
}
