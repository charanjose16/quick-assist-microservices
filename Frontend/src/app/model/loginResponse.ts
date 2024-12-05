export interface LoginResponse {
    token: {
      jwt: string;
    },
    userName: string,
    role: string
  }
  