import { ActionReducer } from "@ngrx/store";
import {MovieState} from "./movieStore/state";
import {AuthState} from "./authStore/state";
import {MovieReducer} from "./movieStore/reducer";
import {AuthReducer} from "./authStore/reducer";
import {AuthEffects} from "./authStore/effects";
import {MovieEffects} from "./movieStore/effects";


export interface AppState {
  movies: MovieState,
  auth: AuthState,
}

export interface AppStore {
  movies: ActionReducer<MovieState>,
  auth: ActionReducer<AuthState>,
}

export const appStore: AppStore = {
  movies: MovieReducer,
  auth: AuthReducer,
}

export const appEffects = [AuthEffects, MovieEffects];



