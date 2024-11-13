import { ScrollArea } from '@/components/ui/scroll-area';
import UserForm from './user-form';

export default function UserViewPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <UserForm />
      </div>
    </ScrollArea>
  );
}
