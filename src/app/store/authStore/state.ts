export interface AuthState {
  accountId: number | null;
  sessionId: string | null;
  token: string | null;
  error: string | null
}

export const initialState: AuthState = {
  accountId: null,
  sessionId: null,
  token: null,
  error: null,
}
