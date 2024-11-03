'use client';

import { useState } from 'react';
import { User } from '@prisma/client';
import { DesktopItem } from '@/components/sideBar/DesktopItem';
import { useRoutes } from '@/hooks/useRoutes';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { SettingModal } from '@/components/sideBar/SettingModal';
import { UserAvatar } from '@/components/UserAvatar';

interface DesktopSidebarProps {
  currentUser: User;
}

export const DesktopSideBar: React.FC<DesktopSidebarProps> = ({
  currentUser,
}) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-3">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                label={item.label}
                href={item.href}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>

        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <UserAvatar user={currentUser}/>
          </div>
        </nav>
      </div>
    </>
  );
};
