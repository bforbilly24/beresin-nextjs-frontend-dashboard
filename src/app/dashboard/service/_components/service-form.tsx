'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Service } from '@/types/service';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// Define schema with status enum
const formSchema = z.object({
	image: z
		.any()
		.refine((files) => files?.length === 1, 'Image is required.')
		.refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
		.refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), '.jpg, .jpeg, .png and .webp files are accepted.'),
	name: z.string().min(2, {
		message: 'Service name must be at least 2 characters.',
	}),
	category: z.string().min(1, 'Category is required'),
	price: z.number().positive('Price must be a positive number'),
	description: z.string().min(10, {
		message: 'Description must be at least 10 characters.',
	}),
	status: z.enum(['accept', 'decline', 'pending'], {
		required_error: 'Status is required',
	}),
});

export default function ServiceForm({ initialData, pageTitle }: { initialData: Service | null; pageTitle: string }) {
	const defaultValues = {
		image: initialData?.images || [],
		name: initialData?.name_of_service || '',
		category: initialData?.category_id.toString() || '', 
		description: initialData?.description || '',
		status: initialData?.status || 'pending', 
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// console.log('Form Values:', values);
		// Handle submit logic here
	}

	return (
		<Card className='mx-auto w-full'>
			<CardHeader>
				<CardTitle className='text-left text-2xl font-bold'>{pageTitle}</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<FormField
							control={form.control}
							name='image'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Images</FormLabel>
									<FormControl>
										<FileUploader value={field.value} onValueChange={field.onChange} maxFiles={4} maxSize={MAX_FILE_SIZE} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Service Name</FormLabel>
										<FormControl>
											<Input placeholder='Enter service name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='category'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<Select onValueChange={(value) => field.onChange(value)} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select category' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='1'>Beauty Service</SelectItem>
												<SelectItem value='2'>Electronics</SelectItem>
												<SelectItem value='3'>Clothing</SelectItem>
												<SelectItem value='4'>Home & Garden</SelectItem>
												<SelectItem value='5'>Sports & Outdoors</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='price'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Price</FormLabel>
										<FormControl>
											<Input type='number' step='0.01' placeholder='Enter price' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea placeholder='Enter service description' className='resize-none' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='status'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<Select onValueChange={(value) => field.onChange(value)} value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select status' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='accept'>Accept</SelectItem>
											<SelectItem value='decline'>Decline</SelectItem>
											<SelectItem value='pending'>Pending</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit'>Save Service</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
