import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define types for the table object and the props
interface TablePaginationProps {
	table: {
		currentPage: number;
		pageSize: number;
		nextPage: () => void;
		previousPage: () => void;
		setPageIndex: (index: number) => void;
		pageCount: number;
	};
	setPageSize: (size: number) => void;
	disabled: boolean;
}

function DataTablePagination({ table, setPageSize, disabled }: TablePaginationProps) {
	// Tambahkan default value agar tidak undefined
	const { currentPage = 0, pageSize = 10, nextPage = () => {}, previousPage = () => {}, setPageIndex = () => {}, pageCount = 1 } = table || {};

	return (
		<div className='flex items-center justify-end px-2'>
			<div className='flex items-center space-x-6 lg:space-x-8'>
				<div className='flex items-center space-x-2'>
					<p className='text-sm font-medium'>Baris per halaman</p>
					<Select
						onValueChange={(value) => {
							setPageSize(Number(value));
						}}
						disabled={disabled || pageCount === 0}
					>
						<SelectTrigger className='h-8 w-[70px]' disabled={disabled || pageCount === 0}>
							<SelectValue placeholder={'10'} />
						</SelectTrigger>
						<SelectContent side='top'>
							{[10, 20, 40, 80, 100].map((size) => (
								<SelectItem key={size} value={`${size}`} disabled={disabled || pageCount === 0}>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex w-fit items-center justify-center text-sm font-medium'>
					Halaman {currentPage + 1} dari {pageCount}
				</div>
				<Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex' onClick={() => setPageIndex(0)} disabled={currentPage === 0 || disabled || pageCount === 0}>
					<DoubleArrowLeftIcon className='h-4 w-4' />
				</Button>
				<Button variant='outline' className='h-8 w-8 p-0' onClick={previousPage} disabled={currentPage === 0 || disabled || pageCount === 0}>
					<ChevronLeftIcon className='h-4 w-4' />
				</Button>
				<Button variant='outline' className='h-8 w-8 p-0' onClick={nextPage} disabled={currentPage === pageCount - 1 || disabled || pageCount === 0}>
					<ChevronRightIcon className='h-4 w-4' />
				</Button>
				<Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex' onClick={() => setPageIndex(pageCount - 1)} disabled={currentPage === pageCount - 1 || disabled || pageCount === 0}>
					<DoubleArrowRightIcon className='h-4 w-4' />
				</Button>
			</div>
		</div>
	);
}

export { DataTablePagination };
