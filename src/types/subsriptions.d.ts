// src/types/subscriptions.d.ts

export interface Subscriptions {
    id: number;
    service_id: number;
    duration: number;
    price: number;
    boost_name: string;
    is_active: boolean;
    created_at: string; // ISO 8601 string format
    updated_at: string; // ISO 8601 string format
    expired_at: string; // ISO 8601 string format
  }
  
  export interface SubscriptionsResponse {
    status: string; // e.g., "success"
    subscriptions: Subscriptions[];
    subscription?: Subscriptions; // This is for single subscription fetch (when an ID is provided)
  }
  