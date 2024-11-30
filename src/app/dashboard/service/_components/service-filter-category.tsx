import { Cross2Icon } from '@radix-ui/react-icons';
import { SlidersHorizontalIcon } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface FilterCategoryProps {
	selectedCategory: string | null;
	onCategoryChange: (categoryId: string | null) => void;
	categories: { id: string; name_of_category: string }[];
}

const ServiceFilterCategory: React.FC<FilterCategoryProps> = ({ selectedCategory, onCategoryChange, categories }) => {
	const [filterValue, setFilterValue] = useState<string | null>(null);

	const handleCategoryChange = (categoryId: string | null) => {
		onCategoryChange(categoryId);
	};

	const resetFilter = () => {
		onCategoryChange(null); 
		setFilterValue(null);
	};

	return (
		<div className='flex flex-row gap-x-2 items-center justify-start'>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
						<SlidersHorizontalIcon className='w-4 h-4 mr-1' />
						Categories
						{selectedCategory && (
							<>
								<Separator orientation='vertical' className='mx-2 h-4' />
								<Badge variant='secondary' className='rounded-sm px-1 font-normal'>
									{categories.find((cat) => cat.id === selectedCategory)?.name_of_category}
								</Badge>
							</>
						)}
					</Button>
				</PopoverTrigger>

				<PopoverContent className='w-[200px] p-0' align='start'>
					<Command>
						<CommandInput placeholder='Filter categories...' value={filterValue} onValueChange={setFilterValue} />
						<CommandList>
							{categories.length === 0 ? (
								<CommandEmpty>No categories found</CommandEmpty>
							) : (
								<CommandGroup>
									{categories.map((category) => (
										<CommandItem key={category.id} onSelect={() => handleCategoryChange(category.id)}>
											<div className='flex items-center'>
												<Checkbox id={category.id} checked={selectedCategory === category.id} onCheckedChange={() => handleCategoryChange(category.id)} />
												<label htmlFor={category.id} className='ml-2'>
													{category.name_of_category}
												</label>
											</div>
										</CommandItem>
									))}
								</CommandGroup>
							)}

							{selectedCategory && (
								<>
									<CommandSeparator />
									<CommandGroup>
										<CommandItem onSelect={resetFilter} className='justify-center text-center'>
											Clear filter
										</CommandItem>
									</CommandGroup>
								</>
							)}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{selectedCategory && (
				<Button size='sm' onClick={resetFilter}>
					<Cross2Icon className='mr-1 h-4 w-4' />
					Clear Filters
				</Button>
			)}
		</div>
	);
};

export { ServiceFilterCategory };
