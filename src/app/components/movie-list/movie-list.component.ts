/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { MovieComponent } from '../movie/movie.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  imports: [MovieComponent],
})
export class MovieListComponent {
  @Input() movies: any = [];
  @Input() favBtns: boolean = false;
  @Input() watchBtns: boolean = false;

  constructor(private router: Router) {}

  handleNavigateToDetailsPage(id: string) {
    this.router.navigate([`movie/${id}`]);
  }
}
