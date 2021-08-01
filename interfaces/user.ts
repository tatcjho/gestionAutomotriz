import { Service } from "./service";

export interface Users {
   user_password ?: string;
   user_name ?: string;
   user_lastname ?: string;
   user_email ?: string;
   user_address ?: string;
   user_phone ?: number;
   user_registration_time ?: string;
   user_registration_date ?: string;
   user_type_account_int ?: number;
   user_type_account_str ?: string;
   user_uid ?: string;
   user_state ?: boolean;
   user_token ?: string;
   user_cedula?: string;

  }