/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { upcomingMovies } from '../../mock-data';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieComponent } from '../../components/movie/movie.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-movie-page',
  standalone: true,
  imports: [HeaderComponent, MovieComponent],
  templateUrl: './upcoming-movie-page.component.html',
  styleUrl: './upcoming-movie-page.component.scss',
})
export class UpcomingMoviePageComponent {
  constructor(private router: Router) {}

  movieList = upcomingMovies;

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
