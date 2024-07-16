/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import { Component, Input, OnInit } from '@angular/core';
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
export class MovieComponent implements OnInit {
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
        this.movieService.setToFavorites(this.data);
      }
      this.data.isFavorite = !this.data.isFavorite;
    }
  }

  changeToWatching() {
    if (this.data) {
      if (this.data.isInWatchingList) {
        this.movieService.deleteFromWatchList(this.data);
      } else {
        this.movieService.setToWatchLater(this.data);
      }
      this.data.isInWatchingList = !this.data.isInWatchingList;
    }
  }
  redirectToDetails() {
    if (this.data) {
      this.router.navigate([`movie/${this.data.id}`]);
    }
  }
}
