// src/actions/service/get-service.ts

import axios from 'axios';

export type ServiceStatus = 'accept' | 'decline' | 'pending';

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

interface ServiceResponse {
	status: string;
	service?: Service; // Single service when fetching by ID
	services?: Service[]; // Array of services when fetching all
}

/**
 * Fetch all services or a single service by ID if `serviceId` is provided.
 * @param token - Authorization token
 * @param serviceId - Optional service ID to fetch a specific service
 * @returns Promise<Service | Service[]> - Returns a single Service or an array of Services
 */
export async function getServices(token: string, serviceId?: number): Promise<Service | Service[] | null> {
	try {
		const url = serviceId
			? `${process.env.NEXT_PUBLIC_API_URL}/admin/services/${serviceId}` // Fetch single service
			: `${process.env.NEXT_PUBLIC_API_URL}/admin/services`; // Fetch all services

		const response = await axios.get<ServiceResponse>(url, {
			headers: { Authorization: `Bearer ${token}` },
		});

		if (response.data.status === 'success') {
			return serviceId ? response.data.service || null : response.data.services || [];
		}

		throw new Error('Failed to fetch service data');
	} catch (error) {
		console.error('Error fetching service data:', error);
		return null;
	}
}

/**
 * Helper function to fetch a single service by ID.
 * @param token - Authorization token
 * @param serviceId - Service ID to fetch
 * @returns Promise<Service | null> - Returns a single Service or null if not found
 */
export async function getServiceById(token: string, serviceId: number): Promise<Service | null> {
	const service = await getServices(token, serviceId);
	return Array.isArray(service) ? null : service;
}
