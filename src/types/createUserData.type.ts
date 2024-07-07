export interface CreateUserData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  password: string;
  password_confirmation: string;
  avatar?: string;
  marketing?: boolean;
}
