import { getUsers } from '@/app/actions/getUsers';
import SideBar from '@/components/sideBar/SideBar';
import { UserList } from '@/components/UserList';

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    <SideBar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </SideBar>
  );
}
