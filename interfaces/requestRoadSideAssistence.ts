export interface RequestRoadSideAssistence {
    request_roadside_assistence_id ?: string;
    request_roadside_assistence_name ?: string;
    request_roadside_assistence_img ?: any;
    request_roadside_assistence_date ?: string;
    request_roadside_assistence_time ?: string;
    request_roadside_assistence_user_name?: string;
    request_roadside_assistence_user_lastname?: string;
    request_roadside_assistence_user_address?: string;
    request_roadside_assistence_user_phone?: string;
    request_roadside_assistence_location?: RoadSideAssistenceLocation ;
    request_roadside_assistence_state?: boolean;

}

declare interface RoadSideAssistenceLocation {
    lat?: number,
    lng?: number,
}