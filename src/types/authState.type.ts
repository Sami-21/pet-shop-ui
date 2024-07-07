import { User } from "./user.type";

export interface AuthState {
  user: User | null;
  token: string;
  error: string | null;
  errors: Object | string[];
  isLoading: boolean;
}
