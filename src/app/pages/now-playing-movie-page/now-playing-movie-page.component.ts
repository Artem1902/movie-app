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

  handleChangeFavorite(data: { id: any }): void {
    const newFavoriteMovieId = data.id;
    console.log(typeof newFavoriteMovieId);
    const index = this.favoriteMovieListIds.indexOf(newFavoriteMovieId);

    if (index !== -1) {
      this.favoriteMovieListIds.splice(index, 1);
    } else {
      this.favoriteMovieListIds.push(newFavoriteMovieId);
    }
  }

  handleChangeWatching(data: { id: any }): void {
    const newWatchingMovieId = data.id;
    const index = this.watchLaterMovieListIds.indexOf(newWatchingMovieId);

    if (index !== -1) {
      this.watchLaterMovieListIds.splice(index, 1);
    } else {
      this.watchLaterMovieListIds.push(newWatchingMovieId);
    }
  }

  handleNavigateToDetailsPage(id: string) {
    this.router.navigate([`movie/${id}`]);
  }
}
