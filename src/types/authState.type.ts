import { User } from "./user.type";

export interface AuthState {
  user: User | {};
  token: string;
  error: string | null;
  errors: Object | string[];
  isLoading: boolean;
}
