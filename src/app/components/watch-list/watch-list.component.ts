/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  nowPlayingMovies,
  popularMovies,
  topRatedMovies,
  upcomingMovies,
} from '../../mock-data';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-watch-list',
  standalone: true,
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.scss',
  imports: [MovieComponent],
})
export class WatchListComponent implements OnInit {
  allMovies = [
    ...nowPlayingMovies,
    ...popularMovies,
    ...topRatedMovies,
    ...upcomingMovies,
  ];

  watchLaterMovies: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const dataString = params['dataIds'];
      if (dataString) {
        const dataIds = JSON.parse(dataString);
        const watchLaterMoviesWithDuplicate = this.allMovies.filter((el) =>
          dataIds.includes(el.id),
        );
        this.watchLaterMovies = watchLaterMoviesWithDuplicate.filter(
          (obj, idx, arr) => idx === arr.findIndex((t) => t.id === obj.id),
        );
      }
    });
  }
}
