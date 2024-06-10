import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent {
  @Input() data: any;
  @Output() addFavorite = new EventEmitter<any>();
  @Output() addWatchList = new EventEmitter<any>();
  details = false;
  favorite = false;
  watchList = false;

  addToFavorites() {
    this.addFavorite.emit(this.data.id);
  }
  addToWatchList() {
    this.addWatchList.emit(this.data.id);
  }

  constructor(private sanitizer: DomSanitizer) {}
  getSafeUrl(url: string | undefined): SafeResourceUrl {
    if (url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return '';
  }
}
