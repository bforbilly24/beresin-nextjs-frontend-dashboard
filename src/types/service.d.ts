export type ServiceStatus = 'accept' | 'decline' | 'pending';

export interface ServiceImage {
	url: string;
}

export interface Service {
	id: number;
	created_at: string;
	updated_at: string;
	user_id: number;
	name_of_service: string;
	category_id: number;
	category_name?: string;
	description: string;
	status: ServiceStatus;
	min_price: number;
	max_price: number;
	like_count: number;
	bookmark_count: number;
	images: string[];
	subscription: Subscription;
	isSubscription: boolean;
    expired_at: string;
}

export interface ServiceResponse {
	status: string;
	services: Service[];
}
