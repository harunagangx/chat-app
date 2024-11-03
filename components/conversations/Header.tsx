'use client';

import { AvatarGroup } from '@/components/AvatarGroup';
import { ProfileDrawer } from '@/components/conversations/ProfileDrawer';
import { Icons } from '@/components/Icons';
import { UserAvatar } from '@/components/UserAvatar';
import useActiveList from '@/hooks/useActiveList';
import { useOtherUser } from '@/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

export const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {members} = useActiveList()

  const isActive = members.indexOf(otherUser?.email!) !== -1

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Active' : "Offline";
  }, [conversation]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-gray-900 transition hover:text-gray-500 cursor-pointer"
          >
            <Icons.chevronLeft />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <UserAvatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <Icons.headerMenu
          onClick={() => setDrawerOpen(true)}
          className="text-gray-900 cursor-pointer hover:text-gray-500 transition"
        />
      </div>
    </>
  );
};
