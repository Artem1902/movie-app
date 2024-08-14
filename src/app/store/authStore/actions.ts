import {createAction, props} from "@ngrx/store";

// ============TOKEN-REQUEST=================================
export const tokenRequest = createAction(
  '[Auth] Token Request',
);
export const tokenRequestSuccess = createAction(
  '[Auth] Token Request Success',
  props<{ token: string }>(),
);
export const tokenRequestFailure = createAction(
  '[Auth] Token Request Failure',
  props<{ error: any }>(),
);

// ============VALIDATE-REQUEST=================================
export const validateRequest = createAction(
  '[Auth] Validate Request',
  props<{ token: string }>(),

);
export const validateRequestSuccess = createAction(
  '[Auth] Validate Request Success',
  props<{ token: string }>(),

);
export const validateRequestFailure = createAction(
  '[Auth] Validate Request Failure',
  props<{ error: any }>(),
);

// ============CREATE_SESSION=================================
export const createSession = createAction(
  '[Auth] Create Session Request',
  props<{ token: string }>(),

);
export const createSessionSuccess = createAction(
  '[Auth] Create Session Request Success',
  props<{ sessionId: string }>(),

);
export const createSessionFailure = createAction(
  '[Auth] Create Session Failure',
  props<{ error: any }>(),
);

// ============GET-ACCOUNT-ID=================================
export const getAccountId = createAction(
  '[Auth] Get Account Id Request',
  props<{ sessionId: string }>(),

);
export const getAccountIdSuccess = createAction(
  '[Auth] Get Account Id Request Success',
  props<{ accountId: number }>(),

);
export const getAccountIdFailure = createAction(
  '[Auth] Get Account Id Request Failure',
  props<{ error: any }>(),
);
