import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Icons } from '@/components/Icons';
import { useConversation } from '@/hooks/useConversation';

export const useRoutes = () => {
  const pathname = usePathname();

  const { conversationId } = useConversation(); 

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: Icons.conversations,
        active: pathname === '/conversations' || !!conversationId,
      },
      {
        label: 'Users',
        href: '/users',
        icon: Icons.users,
        active: pathname === '/users',
      },
      {
        label: 'Logout',
        href: '#',
        onClick: () => signOut(),
        icon: Icons.logOut,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

