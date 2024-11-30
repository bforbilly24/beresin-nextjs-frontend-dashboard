'use client';

import { BanIcon, MoreHorizontalIcon, Trash2Icon } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { deleteUser } from '@/actions/user/delete-user';
import { getUsers } from '@/actions/user/get-user';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataUser } from '@/types/data-user';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import { EyeOpenIcon } from '@radix-ui/react-icons';

const defaultVisibleKeys = ['username', 'name', 'email', 'phone', 'role'];
const DataTable: React.FC<DataTableProps> = ({ users: initialUsers, sessionToken }) => {
  const [users, setUsers] = useState<DataUser[]>(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<{ role: string }>({ role: '' });
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleKeys, setVisibleKeys] = useState<string[]>(defaultVisibleKeys);
  const [pageSize, setPageSize] = useState(10);

  const isAllSelected = users.length > 0 && selectedUsers.length === users.length;
  const isSomeSelected = selectedUsers.length > 0 && selectedUsers.length < users.length;

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers(sessionToken);
      if (Array.isArray(usersData)) {
        setUsers(usersData);
      }
    };
    fetchUsers();
  }, [sessionToken]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearchTerm = user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filters.role ? user.role.toLowerCase() === filters.role.toLowerCase() : true;
      return matchesSearchTerm && matchesRole;
    });
  }, [users, searchTerm, filters]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const paginatedData = useMemo(() => {
    return filteredUsers.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  const handleDeleteSelected = async () => {
    try {
      const deletePromises = selectedUsers.map(async (userId) => {
        const response = await deleteUser(sessionToken, userId);
        if (response && response.status === 'success') {
          console.log(`User with ID ${userId} deleted successfully.`);
        } else {
          console.error(`Failed to delete user with ID: ${userId}`);
        }
      });
      await Promise.all(deletePromises);
      setUsers((prevUsers) => prevUsers.filter((user) => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
      toast.success('Selected users deleted successfully!');
    } catch (error) {
      console.error('Error deleting selected users:', error);
      toast.error('Failed to delete selected users.');
    }
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prevSelected) => (prevSelected.includes(userId) ? prevSelected.filter((id) => id !== userId) : [...prevSelected, userId]));
  };

  return (
    <div className='w-full h-screen flex flex-col gap-y-4'>
      <DataTableToolbar
        data={users}
        fetchData={() => Promise.resolve()}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        searchPlaceholder='Search Users'
        error={null}
        allColumnHeaders={Object.keys(initialUsers[0] || {})}
        visibleKeys={visibleKeys}
        onViewOptionChange={(header, isVisible) => setVisibleKeys((prevKeys) => (isVisible ? [...new Set([...prevKeys, header])] : prevKeys.filter((key) => key !== header)))}
        onSortChange={() => {}} // No sorting
        sortColumn='' // Empty string as no sort column
        sortOrder='' // Empty string as no sort order
      />

      <div className='w-full h-fit flex justify-start items-center gap-4'>
        {selectedUsers.length > 0 && (
          <Button className='h-8 flex items-center justify-center' onClick={handleDeleteSelected} variant='destructive'>
            <Trash2Icon className='mr-1 w-4 h-4' />
            Delete Selected
          </Button>
        )}
      </div>

      <ScrollArea className='h-[28.25rem] w-full'>
        <Table className='border rounded-lg'>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  onCheckedChange={() => {
                    if (isAllSelected) {
                      setSelectedUsers([]);
                    } else {
                      setSelectedUsers(users.map((user) => user.id));
                    }
                  }}
                />
              </TableHead>
              {visibleKeys.map((key) => (
                <TableHead key={key}>{key.toUpperCase()}</TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className='w-8'>
                    <Checkbox checked={selectedUsers.includes(user.id)} onCheckedChange={() => handleSelectUser(user.id)} />
                  </TableCell>
                  {visibleKeys.map((key) => (
                    <TableCell key={`${user.id}-${key}`}>{user[key] || 'N/A'}</TableCell>
                  ))}
                  <TableCell className='flex flex-row gap-x-2 max-w-36 text-start'>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                          <span className='sr-only'>Open menu</span>
                          <MoreHorizontalIcon className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => console.log('Edit user')}>
                          <EyeOpenIcon className='mr-2 h-4 w-4' /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Block user')}>
                          <BanIcon className='mr-2 h-4 w-4' /> Block
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleKeys.length + 2} className='text-center'>
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
        totalItems={filteredUsers.length}
        disabled={false}
      />
    </div>
  );
};

export default DataTable;
