// src/actions/category/delete-category.ts
import axios from 'axios';

interface DeleteCategoryResponse {
	status: string;
	message: string;
}

export async function deleteCategory(token: string, id: number): Promise<DeleteCategoryResponse> {
	try {
		const response = await axios.delete<DeleteCategoryResponse>(`${process.env.NEXT_PUBLIC_API_URL}/admin/category/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error(`Error deleting category with ID ${id}:`, error);
		throw error;
	}
}
