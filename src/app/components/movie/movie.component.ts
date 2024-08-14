/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Movie } from '../../models/movie.model';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsFavorite, selectIsInWatchLater } from '../../store/movieStore/selectors';
import {
  updateFavoritesMovies,
  updateWatchLaterMovies,
} from '../../store/movieStore/actions';
import { ClearObservableDirective } from '../../directives/clear-observable.directive';

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
export class MovieComponent extends ClearObservableDirective implements OnInit {
  @Input() data: Movie | undefined;
  @Input() favBtns: boolean = false;
  @Input() watchBtns: boolean = false;

  isFavorite: boolean = false;
  isInWatchList: boolean = false;

  constructor(
    private router: Router,
    private store: Store,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.data) {
      this.store
        .select(selectIsFavorite(this.data.id))
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => (this.isFavorite = res));
      this.store
        .select(selectIsInWatchLater(this.data.id))
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => (this.isInWatchList = res));
    }
  }

  onUpdateFavorites(id: number) {
    this.store.dispatch(
      updateFavoritesMovies({ movie_id: id, isFavorite: this.isFavorite }),
    );
  }
  onUpdateWatchList(id: number) {
    this.store.dispatch(
      updateWatchLaterMovies({
        movie_id: id,
        isInWatchList: this.isInWatchList,
      }),
    );
  }

  redirectToDetails() {
    if (this.data) {
      this.router.navigate([`movie/${this.data.id}`]);
    }
  }
}
