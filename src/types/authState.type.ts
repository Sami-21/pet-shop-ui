import { Order } from "./order.type";
import { User } from "./user.type";

export interface AuthState {
  user: User | null;
  token: string;
  orders: Order[];
  totalOrders: number;
  error: string | null;
  errors: Object | string[];
  isLoading: boolean;
}
