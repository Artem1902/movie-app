import {AuthState} from "./state";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const selectState = createFeatureSelector<AuthState>('auth');

export const selectAccountId = createSelector(
  selectState,
  (state) => state.accountId,
);

export const selectSessionId = createSelector(
  selectState,
  (state) => state.sessionId,
);

export const selectToken = createSelector(
  selectState,
  (state) => state.token,
);
