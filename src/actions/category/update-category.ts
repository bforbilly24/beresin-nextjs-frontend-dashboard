// src/actions/category/update-category.ts
import axios from 'axios';

interface UpdateCategoryResponse {
	status: string;
	message: string;
}

export async function updateCategory(token: string, id: number, name_of_category: string): Promise<UpdateCategoryResponse> {
	try {
		const response = await axios.put<UpdateCategoryResponse>(
			`${process.env.NEXT_PUBLIC_API_URL}/admin/category/${id}`,
			{ name_of_category },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error(`Error updating category with ID ${id}:`, error);
		throw error;
	}
}
