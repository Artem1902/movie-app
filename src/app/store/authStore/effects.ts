import {
  createSessionFailure,
  createSessionSuccess, getAccountIdFailure, getAccountIdSuccess,
  tokenRequest,
  tokenRequestFailure,
  tokenRequestSuccess,
  validateRequestFailure,
  validateRequestSuccess
} from "./actions";
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../services/auth.service";
import {catchError, map, of, switchMap} from "rxjs";


@Injectable()
export class AuthEffects {
  tokenRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tokenRequest),
      switchMap(() => {
        return this.authService.getRequestToken().pipe(
          map((token) => tokenRequestSuccess({token: token})
          ),
          catchError((error) => of(tokenRequestFailure({error}))),
        );
      }),
    );
  });

  validateRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tokenRequestSuccess),
      switchMap((props) => {
        const token = props.token
        return this.authService.validateRequestToken(token).pipe(
          map(() => validateRequestSuccess({token})
          ),
          catchError((error) => of(validateRequestFailure({error}))),
        );
      }),
    );
  });

  createSession$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(validateRequestSuccess),
      switchMap((props) => {
        const token = props.token
        return this.authService.createSession(token).pipe(
          map((sessionId) => createSessionSuccess({sessionId})
          ),
          catchError((error) => of(createSessionFailure({error}))),
        );
      }),
    );
  });

  getAccountId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createSessionSuccess),
      switchMap((props) => {
        const sessionId = props.sessionId
        return this.authService.getAccountId(sessionId).pipe(
          map((accountId) => getAccountIdSuccess({accountId: accountId})
          ),
          catchError((error) => of(getAccountIdFailure({error}))),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}
}

