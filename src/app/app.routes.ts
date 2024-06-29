import { Routes } from '@angular/router';
import { MovieDetailPageComponent } from './pages/movie-detail-page/movie-detail-page.component';
import { NowPlayingMoviePageComponent } from './pages/now-playing-movie-page/now-playing-movie-page.component';
import { PopularMoviePageComponent } from './pages/popular-movie-page/popular-movie-page.component';
import { TopRatedMoviePageComponent } from './pages/top-rated-movie-page/top-rated-movie-page.component';
import { UpcomingMoviePageComponent } from './pages/upcoming-movie-page/upcoming-movie-page.component';
import { FavoriteMoviesComponent } from './components/favorite-movies/favorite-movies.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'movie/:id', component: MovieDetailPageComponent },
  { path: 'now-playing', component: NowPlayingMoviePageComponent },
  { path: 'popular', component: PopularMoviePageComponent },
  { path: 'top-rated', component: TopRatedMoviePageComponent },
  { path: 'upcoming', component: UpcomingMoviePageComponent },
  { path: 'favorite', component: FavoriteMoviesComponent, outlet: 'header' },
  { path: 'watch-list', component: WatchListComponent, outlet: 'header' },
  { path: '**', component: NotFoundPageComponent },
];
