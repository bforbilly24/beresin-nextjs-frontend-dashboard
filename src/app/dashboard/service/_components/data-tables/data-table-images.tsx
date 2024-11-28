import Image from 'next/image';
import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface ServiceImageProps {
	imagePath: string;
}

const ServiceImage: React.FC<ServiceImageProps> = ({ imagePath }) => {
	const [isError, setIsError] = useState(false);
	const fullImageUrl = `${process.env.NEXT_PUBLIC_API_URL_IMAGE}/${imagePath}`;
	const [isDialogOpen, setIsDialogOpen] = useState(false); // State untuk kontrol dialog

	return (
		<>
			{isError ? (
				<Image src='/beresin.svg' alt='Placeholder Image' className='h-12 w-12 aspect-square rounded-md' />
			) : (
				// Membungkus gambar dengan AlertDialogTrigger
				<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<AlertDialogTrigger asChild>
						<Image
							src={fullImageUrl}
							alt='Service Image'
							className='aspect-square rounded-md cursor-pointer' // Menambahkan cursor pointer
							width={48}
							height={48}
							onError={() => setIsError(true)}
						/>
					</AlertDialogTrigger>
					{/* Alert Dialog */}
					<AlertDialogContent className='w-96 h-fit max-w-full'>
						<AlertDialogHeader>
							<AlertDialogTitle>View Image</AlertDialogTitle>
							<AlertDialogDescription>Click the image to view it in full size.</AlertDialogDescription>
						</AlertDialogHeader>
						<div className='flex justify-center items-center'>
							<Image
								src={fullImageUrl}
								alt='Full-size Service Image'
								className='cursor-pointer'
								width={800} 
								height={800}
								onClick={() => window.open(fullImageUrl, '_blank')}
							/>
						</div>
						<AlertDialogFooter className='flex flex-row'>
							<AlertDialogCancel className='w-full' onClick={() => setIsDialogOpen(false)}>Close</AlertDialogCancel>
							<AlertDialogAction className='w-full' onClick={() => window.open(fullImageUrl, '_blank')}>Open in New Tab</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</>
	);
};

export default ServiceImage;
