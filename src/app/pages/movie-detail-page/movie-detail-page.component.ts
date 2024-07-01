/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  nowPlayingMovies,
  popularMovies,
  topRatedMovies,
  upcomingMovies,
} from '../../mock-data';
import { MovieComponent } from '../../components/movie/movie.component';

@Component({
  selector: 'app-movie-detail-page',
  standalone: true,
  templateUrl: './movie-detail-page.component.html',
  styleUrl: './movie-detail-page.component.scss',
  imports: [MovieComponent],
})
export class MovieDetailPageComponent implements OnInit {
  allMovies = [
    ...nowPlayingMovies,
    ...popularMovies,
    ...topRatedMovies,
    ...upcomingMovies,
  ];

  findedMovieDetails: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const movieId = Number(params['id']);
      this.findedMovieDetails = this.allMovies.find((el) => el.id === movieId);
    });
  }
}
