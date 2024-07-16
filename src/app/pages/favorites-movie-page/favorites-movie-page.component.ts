/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-favorites-movie-page',
  standalone: true,
  templateUrl: './favorites-movie-page.component.html',
  styleUrl: './favorites-movie-page.component.scss',
  imports: [MovieListComponent],
})
export class FavoritesMoviePageComponent implements OnInit {
  favoritesMovies: Movie[] | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.favoriteMoviesList$.subscribe((data) => {
      this.favoritesMovies = data;
    });
  }
}
