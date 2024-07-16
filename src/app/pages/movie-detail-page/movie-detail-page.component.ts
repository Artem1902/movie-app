/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsMovie } from '../../models/movie.model';
import { MovieComponent } from '../../components/movie/movie.component';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail-page',
  standalone: true,
  templateUrl: './movie-detail-page.component.html',
  styleUrl: './movie-detail-page.component.scss',
  imports: [MovieComponent],
})
export class MovieDetailPageComponent implements OnInit {
  findedMovieDetails: DetailsMovie | undefined;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const movieId = Number(params['id']);
      this.movieService.getDetailsMovie(movieId).subscribe((movie) => {
        this.findedMovieDetails = movie;
        console.log(this.findedMovieDetails);
      });
    });
  }
}
