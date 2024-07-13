/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MovieService } from '../../services/movie.service';

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
  @Input() data: any;
  @Input() favBtns: boolean = false;
  @Input() watchBtns: boolean = false;

  @Output() redirectDetails = new EventEmitter<any>();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    if (!this.data.hasOwnProperty('isFavorite')) {
      this.data.isFavorite = false;
    }
    if (!this.data.hasOwnProperty('isInWatchingList')) {
      this.data.isInWatchingList = false;
    }
  }
  changeToFavorites() {
    if (this.data.isFavorite) {
      this.movieService.deleteFromFavorites(this.data.id);
    } else {
      this.movieService.setToFavorites(this.data.id);
    }
    this.data.isFavorite = !this.data.isFavorite;
  }

  changeToWatching() {
    if (this.data.isInWatchingList) {
      this.movieService.deleteFromWatchList(this.data.id);
    } else {
      this.movieService.setToWatchLater(this.data.id);
    }
    this.data.isInWatchingList = !this.data.isInWatchingList;
  }
  redirectToDetails() {
    this.redirectDetails.emit(this.data.id);
  }
}
