export interface LoginResponse {
  token: string;
}

export interface TokenBody {
  sub: string;
  jti: string;
  email: string;
  id: string;
  nbf: number;
  exp: number;
  iat: number;
}
