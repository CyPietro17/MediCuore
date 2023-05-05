export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface UserRequest {
  username: string | null | undefined;
  email: string | null | undefined;
  password: string | null | undefined;
}
