export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    role: string;
  };
  tokens: TokenPair;
}
