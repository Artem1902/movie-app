import {createReducer, on} from "@ngrx/store";
import {initialState} from "./state";
import {
  createSessionFailure,
  createSessionSuccess, getAccountIdFailure, getAccountIdSuccess,
  tokenRequestFailure,
  tokenRequestSuccess,
  validateRequestFailure,
  validateRequestSuccess
} from "./actions";

export const AuthReducer = createReducer(
  initialState,

  // ============TOKEN-REQUEST=================================
  on(tokenRequestSuccess, (state, { token }) => {
    return { ...state, token: token};
  }),
  on(tokenRequestFailure, (state, { error }) => {
    return { ...state, error: error };
  }),

// ============VALIDATE-REQUEST=================================
  on(validateRequestSuccess, (state, { token }) => {
    return { ...state, token: token};
  }),
  on(validateRequestFailure, (state, { error }) => {
    return { ...state, error: error };
  }),

// ============CREATE_SESSION=================================
  on(createSessionSuccess, (state, { sessionId }) => {
    return { ...state, sessionId: sessionId};
  }),
  on(createSessionFailure, (state, { error }) => {
    return { ...state, error: error };
  }),

// ============GET-ACCOUNT-ID=================================
  on(getAccountIdSuccess, (state, { accountId }) => {
    return { ...state, accountId: accountId};
  }),
  on(getAccountIdFailure, (state, { error }) => {
    return { ...state, error: error };
  })
)
