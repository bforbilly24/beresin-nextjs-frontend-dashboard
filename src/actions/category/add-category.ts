// src/actions/category/add-category.ts
import axios from 'axios';

interface AddCategoryResponse {
	status: string;
	message: string;
}

export async function addCategory(token: string, name_of_category: string): Promise<AddCategoryResponse> {
	try {
		const response = await axios.post<AddCategoryResponse>(
			`${process.env.NEXT_PUBLIC_API_URL}/admin/category`,
			{ name_of_category },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error adding category:', error);
		throw error;
	}
}
