// src/types/subscription-list.d.ts

export interface SubscriptionPlan {
	id: number;
	boost_name: string;
	duration: number;
	price: number;
	created_at: string; // ISO 8601 string format
	updated_at: string; // ISO 8601 string format
}

export interface SubscriptionListResponse {
	status: string; // e.g., "success"
	plans: SubscriptionPlan[];
	plan?: SubscriptionPlan; // This is for single plan fetch (when an ID is provided)
}
