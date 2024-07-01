/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  nowPlayingMovies,
  popularMovies,
  topRatedMovies,
  upcomingMovies,
} from '../../mock-data';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-favorite-movies',
  standalone: true,
  templateUrl: './favorite-movies.component.html',
  styleUrl: './favorite-movies.component.scss',
  imports: [MovieComponent],
})
export class FavoriteMoviesComponent implements OnInit {
  allMovies = [
    ...nowPlayingMovies,
    ...popularMovies,
    ...topRatedMovies,
    ...upcomingMovies,
  ];

  favoritesMovies: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const dataString = params['dataIds'];
      if (dataString) {
        const dataIds = JSON.parse(dataString);
        const favoritesMoviesWithDuplicate = this.allMovies.filter((el) =>
          dataIds.includes(el.id),
        );
        this.favoritesMovies = favoritesMoviesWithDuplicate.filter(
          (obj, idx, arr) => idx === arr.findIndex((t) => t.id === obj.id),
        );
      }
    });
  }
}
