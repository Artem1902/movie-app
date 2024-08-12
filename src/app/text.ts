// Причиною того, що ваш закоментований код не працює, є те, що of оператор створює Observable, який просто емітує передане значення і завершується. Оскільки this.store.dispatch не повертає результат, використання of не буде працювати належним чином у вашому ланцюжку операторів RxJS.

// Вам потрібно використовувати інші підходи для обробки асинхронних дій в NgRx, такі як ефекти (effects).

// Ось приклад, як ви можете це реалізувати з використанням ефектів (effects):

// Спочатку створіть ефекти для кожної з ваших асинхронних дій:
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { Store } from '@ngrx/store';
// import { switchMap, map, catchError } from 'rxjs/operators';
// import { of } from 'rxjs';
// import {
//   getRequestToken,
//   getValidRequestToken,
//   getUserSessionId,
//   getUserAccountId,
//   getGenresForMovies,
//   setRequestToken,
//   setSessionId,
// } from './actions';
// import { AppState } from './state';

// @Injectable()
// export class MyEffects {
//   constructor(private actions$: Actions, private store: Store<AppState>) {}

//   requestToken$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(getRequestToken),
//       switchMap(() => {
//         // Your API call to get request token
//         return this.api.getRequestToken().pipe(
//           map((token) => setRequestToken({ token })),
//           catchError((error) => of({ type: 'GET_REQUEST_TOKEN_FAILED', error }))
//         );
//       })
//     )
//   );

//   validRequestToken$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(setRequestToken),
//       switchMap(({ token }) => {
//         // Your API call to validate request token
//         return this.api.validateRequestToken(token).pipe(
//           map((validToken) => getValidRequestToken({ requestToken: validToken })),
//           catchError((error) => of({ type: 'GET_VALID_REQUEST_TOKEN_FAILED', error }))
//         );
//       })
//     )
//   );

//   sessionId$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(getValidRequestToken),
//       switchMap(({ requestToken }) => {
//         // Your API call to create session ID
//         return this.api.createSessionId(requestToken).pipe(
//           map((sessionId) => setSessionId({ sessionId })),
//           catchError((error) => of({ type: 'CREATE_SESSION_ID_FAILED', error }))
//         );
//       })
//     )
//   );

//   accountId$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(setSessionId),
//       switchMap(({ sessionId }) => {
//         // Your API call to get account ID
//         return this.api.getAccountId(sessionId).pipe(
//           map((accountId) => getUserAccountId({ accountId })),
//           catchError((error) => of({ type: 'GET_ACCOUNT_ID_FAILED', error }))
//         );
//       })
//     )
//   );

//   // Effect for getting genres for movies
//   genres$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(getUserAccountId),
//       switchMap(() => {
//         // Your API call to get genres
//         return this.api.getGenres().pipe(
//           map((genres) => getGenresForMovies({ genres })),
//           catchError((error) => of({ type: 'GET_GENRES_FAILED', error }))
//         );
//       })
//     )
//   );
// }
// Потім у вашому компоненті просто диспатчіть першу дію:
// this.store.dispatch(getRequestToken());

// Ефекти будуть обробляти всі асинхронні виклики і послідовно виконувати необхідні дії.

// Цей підхід є більш чистим і відповідає стандартним підходам до управління побічними ефектами в NgRx.

// Створюєте селектори:
// export const selectFavorites = createSelector(
//   selectFavoriteState,
//   (state: FavoriteState) => state.favorites
// );

// export const isFavorite = (movieId: number) => createSelector(
//   selectFavorites,
//   (favorites: number[]) => favorites.includes(movieId)
// );
// 2.Виклористовуєте його в компоненті:

// this.isFavorite$ = this.store.select(isFavorite(this.movieId));

// У вас все гарно реалізовано, мені подобається як виглядає ваш код.

// Маю зауваження одне: коли ви додаєте фільм до улюблених (або видаляєте, але знаходитеся не на сторінці favorite), то вам не потрібно робити запит getFavorite, щоб оновити список. Для додавання взагалі не потрібні ніякі додаткові запити, бо ви не можете додати фільм в улюблені вже будучи на сторінці улюблених, а в усіх інших випадках список оновиться як тільки ви перейтеде на сторінку улюблених фільмів.

// Чому?
// Бо при переході на сторінку favorite ви всеодно робите this.store.dispatch(MovieActions.loadFavoriteMovies()); і уже отримаєте оновлений список.

// Цей додатковий запит на оновлення потрібно робити тільки коли ви видаляєте фільм безпосередньо знаходячись на сторінці улюблених фільмів, бо інакше список не оновиться так як onInit вже спрацював.

// Тому перед додатковим запитом на оновлення списку улюблених фільми (після видалення фільму) додайте перевірку на якій сторінці ви знаходитеся і відправляйте запит тільки якщо це сторінка улюблених фільмів.

// Для watchList та сама концепція.
// Хіба що у вас підвязана якась логіка і вам дійсно потрібно мати оновлений список. Може для іконок чи щось так

// Якщо у вас є запитання, або щось не зрозуміло, то пишіть мені в діскорд

// не знаю чи була у вас проблема з тим, як отримувати значення без перевірок і підписки в компоненті на вибрані фільми, щоб зрозуміти чи фільм вже в улюблених (до прикладу) чи ні.

// Ось рішення як це робити за допомогою селектора:

// export const isFavorite = (movie: Movie) => createSelector(
//   selectMovieState,
//   (state) => state.favoriteMovies?.includes(movie)
// );
// Використовувати його в компоненті можна так:

// this.isFavorite$ = this.store.select(isFavorite(this.movieId));

// this.store
//   .select(selectFavoriteMoviesIds)
//   .pipe(takeUntil(this.destroy$))
//   .subscribe((ids) => {
//     this.favoriteIsActive = ids.includes(this.mov.id);
//   });
