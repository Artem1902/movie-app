/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import { Component, Input } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatPipe,
    UpperCasePipe,
    CardModule,
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent {
  @Input() data: Movie | undefined;
  @Input() favBtns: boolean = false;
  @Input() watchBtns: boolean = false;

  constructor(
    private movieService: MovieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.data) {
      if (!this.data.hasOwnProperty('isFavorite')) {
        this.data.isFavorite = false;
      }
      if (!this.data.hasOwnProperty('isInWatchingList')) {
        this.data.isInWatchingList = false;
      }
    }
  }

  changeToFavorites() {
    if (this.data) {
      if (this.data.isFavorite) {
        this.movieService.deleteFromFavorites(this.data);
      } else {
        this.movieService.setToFavorites(this.data).subscribe(
          (response) => {
            console.log('Response from API:', response);
          },
          (error) => {
            console.error('Error:', error);
          },
        );
      }
      this.data.isFavorite = !this.data.isFavorite;
    }
  }

  changeToWatching() {
    if (this.data) {
      if (this.data.isInWatchingList) {
        this.movieService.deleteFromWatchList(this.data);
      } else {
        this.movieService.setToWatchLater(this.data).subscribe(
          (response) => {
            console.log('Response from API:', response);
          },
          (error) => {
            console.error('Error:', error);
          },
        );
      }
      this.data.isInWatchingList = !this.data.isInWatchingList;
    }
  }

  deleteFavorite() {
    if (this.data) {
      this.movieService.deleteFromFavorites(this.data).subscribe(
        (response) => {
          console.log('Response from API:', response);
        },
        (error) => {
          console.error('Error:', error);
        },
      );
    }
  }

  deleteWatchList() {
    if (this.data) {
      this.movieService.deleteFromWatchList(this.data).subscribe(
        (response) => {
          console.log('Response from API:', response);
        },
        (error) => {
          console.error('Error:', error);
        },
      );
    }
  }

  redirectToDetails() {
    if (this.data) {
      this.router.navigate([`movie/${this.data.id}`]);
    }
  }
}
