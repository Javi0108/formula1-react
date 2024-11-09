export interface Meeting {
    session_key: number;
    session_name: string;
    date_start: Date;
    date_end: Date;
    gmt_offset: string;
    session_type: string;
    meeting_key: number;
    location: string;
    country_key: number;
    country_code: string;
    country_name: string;
    circuit_key: number
    circuit_short_name: string;
    year: number
}
