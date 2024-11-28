'use client';

import { ListFilterIcon } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface FilterSubscriptionProps {
	selectedSubscription: boolean | null;
	selectedBoostName: string | null;
	onSubscriptionChange: (status: boolean | null) => void;
	onBoostNameChange: (boostName: string | null) => void;
	boostNames: string[]; // List of available boost names (e.g. ["Standard Boost", "Premium Boost"])
}

const ServiceFilterSubscription: React.FC<FilterSubscriptionProps> = ({ selectedSubscription, selectedBoostName, onSubscriptionChange, onBoostNameChange, boostNames }) => {
	const [filterValue, setFilterValue] = useState<string | null>(null);

	// Handle subscription status change
	const handleSubscriptionChange = (status: boolean | null) => {
		onSubscriptionChange(status);
	};

	// Handle boost name selection
	const handleBoostNameChange = (boostName: string | null) => {
		onBoostNameChange(boostName);
	};

	// Reset filters
	const resetFilters = () => {
		onSubscriptionChange(null); // Reset subscription filter
		onBoostNameChange(null); // Reset boost name filter
		setFilterValue(null); // Clear search input
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
					<ListFilterIcon className='w-4 h-4 mr-1' />
					Subscription & Boost
					{(selectedSubscription !== null || selectedBoostName) && (
						<>
							<Separator orientation='vertical' className='mx-2 h-4' />
							<Badge variant='secondary' className='rounded-sm px-1 font-normal'>
								{selectedSubscription !== null ? (selectedSubscription ? 'Subscribed' : 'Not Subscribed') : 'Any Subscription'}
								{selectedBoostName && ` - ${selectedBoostName}`}
							</Badge>
						</>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent className='w-[300px] p-0' align='start'>
				<Command>
					<CommandInput placeholder='Filter subscription...' value={filterValue} onValueChange={setFilterValue} />
					<CommandList>
						{/* Subscription Filter */}
						<CommandGroup>
							<CommandItem onSelect={() => handleSubscriptionChange(true)}>
								<div className='flex items-center'>
									<Checkbox id='isSubscribed' checked={selectedSubscription === true} onCheckedChange={() => handleSubscriptionChange(true)} />
									<label htmlFor='isSubscribed' className='ml-2'>
										Subscribed
									</label>
								</div>
							</CommandItem>
							<CommandItem onSelect={() => handleSubscriptionChange(false)}>
								<div className='flex items-center'>
									<Checkbox id='isNotSubscribed' checked={selectedSubscription === false} onCheckedChange={() => handleSubscriptionChange(false)} />
									<label htmlFor='isNotSubscribed' className='ml-2'>
										Not Subscribed
									</label>
								</div>
							</CommandItem>
						</CommandGroup>

						{/* Boost Name Filter */}
						<CommandGroup>
							{boostNames.map((boostName) => (
								<CommandItem key={boostName} onSelect={() => handleBoostNameChange(boostName)}>
									<div className='flex items-center'>
										<Checkbox id={boostName} checked={selectedBoostName === boostName} onCheckedChange={() => handleBoostNameChange(boostName)} />
										<label htmlFor={boostName} className='ml-2'>
											{boostName}
										</label>
									</div>
								</CommandItem>
							))}
						</CommandGroup>

						{/* Reset Filter */}
						{(selectedSubscription !== null || selectedBoostName) && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem onSelect={resetFilters} className='justify-center text-center'>
										Clear filters
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

export { ServiceFilterSubscription };
