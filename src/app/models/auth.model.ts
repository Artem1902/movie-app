export interface RequestTokenResponseInterface {
  success: boolean,
  expires_at: string,
  request_token: string
}

export interface RequestSessionResponseInterface {
  success: boolean
  session_id: string
}
