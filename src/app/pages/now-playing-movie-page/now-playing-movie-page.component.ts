/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { nowPlayingMovies } from '../../mock-data';
import { MovieComponent } from '../../components/movie/movie.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-now-playing-movie-page',
  standalone: true,
  imports: [MovieComponent, HeaderComponent],
  templateUrl: './now-playing-movie-page.component.html',
  styleUrl: './now-playing-movie-page.component.scss',
})
export class NowPlayingMoviePageComponent {
  constructor(private router: Router) {}
  movieList = nowPlayingMovies;

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
