export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  avatar?: string | null;
  created_at: string;
  is_marketing?: boolean;
  updated_at: string | Date;
  uuid: string;
}
