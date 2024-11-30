'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { SlidersHorizontalIcon } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface UserFilterSortProps {
  selectedSort: 'asc' | 'desc' | null;
  onSortChange: (sort: 'asc' | 'desc' | null) => void;
}

const UserFilterSort: React.FC<UserFilterSortProps> = ({ selectedSort, onSortChange }) => {
  const [filterValue, setFilterValue] = useState<string | null>(null);

  // Sort options
  const sortOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ];

  const handleSortChange = (sort: 'asc' | 'desc' | null) => {
    onSortChange(sort); // Update the sort order in the parent component
  };

  const resetFilter = () => {
    onSortChange(null); // Reset sort
    setFilterValue(null); // Reset filter input
  };

  return (
    <div className='flex flex-row gap-x-2 items-center justify-start'>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
            <SlidersHorizontalIcon className='w-4 h-4 mr-1' />
            Sort
            {selectedSort && (
              <>
                <Separator orientation='vertical' className='mx-2 h-4' />
                <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
                  {sortOptions.find((option) => option.value === selectedSort)?.label}
                </Badge>
              </>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-[200px] p-0' align='start'>
          <Command>
            <CommandInput placeholder='Filter sort options...' value={filterValue} onValueChange={setFilterValue} />
            <CommandList>
              {sortOptions.length === 0 ? (
                <CommandEmpty>No sort options found</CommandEmpty>
              ) : (
                <CommandGroup>
                  {sortOptions.map((option) => (
                    <CommandItem key={option.value} onSelect={() => handleSortChange(option.value)}>
                      <div className='flex items-center'>
                        <Checkbox
                          id={option.value}
                          checked={selectedSort === option.value}
                          onCheckedChange={() => handleSortChange(option.value)}
                        />
                        <label htmlFor={option.value} className='ml-2'>
                          {option.label}
                        </label>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {selectedSort && (
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

      {selectedSort && (
        <Button size='sm' onClick={resetFilter}>
          <Cross2Icon className='mr-1 h-4 w-4' />
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export { UserFilterSort };
