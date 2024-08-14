/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  imports: [MovieComponent],
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];
  @Input() favBtns: boolean = false;
  @Input() watchBtns: boolean = false;

  constructor() {}
}
