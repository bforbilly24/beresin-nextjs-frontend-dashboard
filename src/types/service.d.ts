
export type ServiceStatus = 'accept' | 'decline' | 'pending';

export interface ServiceImage {
	url: string;
}

export interface Service {
	id: number;
	created_at: string;
	updated_at: string;
	user_id: number;
	isSubscription: boolean;
	name_of_service: string;
	category_id: number;
	description: string;
	status: ServiceStatus;
	images: string[];
}

export interface ServiceResponse {
	status: string;
	services: Service[];
}
