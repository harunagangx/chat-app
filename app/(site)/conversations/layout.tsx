import { getConversations } from '@/app/actions/getConversations';
import { getUsers } from '@/app/actions/getUsers';
import { ConversationList } from '@/components/ConversationList';
import SideBar from '@/components/sideBar/SideBar';

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  const users = await getUsers();

  return (
    <SideBar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </SideBar>
  );
}
