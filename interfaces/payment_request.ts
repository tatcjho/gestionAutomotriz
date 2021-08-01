export interface Payment{
    payment_request_uid?:string;
    payment_request_state?: boolean;
    payment_request_description?: string;
    payment_request_title?: string;
    payment_request_total_to_pay?: string;
    payment_request_date?: string;
    payment_request_time?: string;
    payment_request_user_name?: string;
    payment_request_user_last_name?: string;
    payment_request_user_email?: string;
    payment_request_user_phone?: number;

}