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
export class MovieListComponent implements OnInit {
  movies = [...movies];
  @Input() data: any;

  public movie: any;
  ngOnInit() {
    this.movie = this.data;
  }

  favoritesArr: string[] = [];
  watchingArr: string[] = [];

  handleAddFavorite(movieId: number) {
    const newFaforiteMovie = this.movies.find((el) => el.id == movieId);
    if (
      newFaforiteMovie &&
      !this.favoritesArr.includes(newFaforiteMovie.title)
    ) {
      this.favoritesArr.push(newFaforiteMovie.title);
    }
  }

  handleAddWatchList(movieId: number) {
    const newWatchingMovie = this.movies.find((el) => el.id == movieId);
    if (
      newWatchingMovie &&
      !this.watchingArr.includes(newWatchingMovie.title)
    ) {
      this.watchingArr.push(newWatchingMovie.title);
    }
  }
}
