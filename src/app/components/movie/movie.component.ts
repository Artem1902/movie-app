/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

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
  @Output() changeFavorite = new EventEmitter<any>();
  @Output() changeWatching = new EventEmitter<any>();

  isMore = false;

  ngOnInit(): void {
    if (!this.data.hasOwnProperty('isFavorite')) {
      this.data.isFavorite = false;
    }
    if (!this.data.hasOwnProperty('isInWatchingList')) {
      this.data.isInWatchingList = false;
    }
  }

  changeIsMore() {
    this.isMore = !this.isMore;
  }
  changeToFavorites() {
    this.data.isFavorite = !this.data.isFavorite;
    this.changeFavorite.emit(this.data);
  }
  changeToWatching() {
    this.data.isInWatchingList = !this.data.isInWatchingList;
    this.changeWatching.emit(this.data);
  }
}
