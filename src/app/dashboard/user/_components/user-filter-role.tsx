'use client'

import { Cross2Icon } from '@radix-ui/react-icons';
import { SlidersHorizontalIcon } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface FilterRoleProps {
	selectedRole: string | null;
	onRoleChange: (role: string | null) => void;
}

const UserFilterRole: React.FC<FilterRoleProps> = ({ selectedRole, onRoleChange }) => {
	const [filterValue, setFilterValue] = useState<string | null>(null);

	const roles = [
		{ value: 'admin', label: 'Admin' },
		{ value: 'user', label: 'User' },
	];

	const handleRoleChange = (role: string | null) => {
		onRoleChange(role);
	};

	const resetFilter = () => {
		onRoleChange(null);
		setFilterValue(null);
	};

	return (
		<div className='flex flex-row gap-x-2 items-center justify-start'>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
						<SlidersHorizontalIcon className='w-4 h-4 mr-1' />
						Roles
						{selectedRole && (
							<>
								<Separator orientation='vertical' className='mx-2 h-4' />
								<Badge variant='secondary' className='rounded-sm px-1 font-normal'>
									{roles.find((role) => role.value === selectedRole?.toLowerCase())?.label}
								</Badge>
							</>
						)}
					</Button>
				</PopoverTrigger>

				<PopoverContent className='w-[200px] p-0' align='start'>
					<Command>
						<CommandInput placeholder='Filter roles...' value={filterValue} onValueChange={setFilterValue} />
						<CommandList>
							{roles.length === 0 ? (
								<CommandEmpty>No roles found</CommandEmpty>
							) : (   
								<CommandGroup>
									{roles.map((role) => (
										<CommandItem key={role.value} onSelect={() => handleRoleChange(role.value)}>
											<div className='flex items-center'>
												<Checkbox
													id={role.value}
													checked={selectedRole?.toLowerCase() === role.value}
													onCheckedChange={() => handleRoleChange(role.value)}
												/>
												<label htmlFor={role.value} className='ml-2'>
													{role.label}
												</label>
											</div>
										</CommandItem>
									))}
								</CommandGroup>
							)}

							{selectedRole && (
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

			{selectedRole && (
				<Button size='sm' onClick={resetFilter}>
					<Cross2Icon className='mr-1 h-4 w-4' />
					Clear Filters
				</Button>
			)}
		</div>
	);
};


export { UserFilterRole };
