import { CheckIcon } from '@radix-ui/react-icons';
import { ListFilterIcon } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface FilterCategoryProps {
	selectedCategory: string | null;
	onCategoryChange: (categoryId: string | null) => void;
	categories: { id: string; name_of_category: string }[];
}

const ServiceFilterCategory: React.FC<FilterCategoryProps> = ({ selectedCategory, onCategoryChange, categories }) => {
	const [filterValue, setFilterValue] = useState<string | null>(null);

	const handleCategoryChange = (categoryId: string | null) => {
		onCategoryChange(categoryId); // Set category to the selected category
	};

	const resetFilter = () => {
		onCategoryChange(null); // Clear the selected category
		setFilterValue(null); // Reset filter value
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
					<ListFilterIcon className='w-4 h-4 mr-1' />
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
	);
};

export { ServiceFilterCategory };
