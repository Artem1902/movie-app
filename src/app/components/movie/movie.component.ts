import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, DateFormatPipe, UpperCasePipe],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent {
  @Input() data: any;
  @Output() changeFavorite = new EventEmitter<any>();
  @Output() changeWatching = new EventEmitter<any>();

  isMore = false;

  changeIsMore() {
    this.isMore = !this.isMore;
  }
  changeToFavorites() {
    this.data.favorite = !this.data.favorite;
    this.changeFavorite.emit(this.data);
  }
  changeToWatching() {
    this.data.isInWatchingList = !this.data.isInWatchingList;
    this.changeWatching.emit(this.data);
  }
}
