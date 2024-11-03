'use client';

import { MobileItem } from '@/components/sideBar/MobileItem';
import { useConversation } from '@/hooks/useConversation';
import { useRoutes } from '@/hooks/useRoutes';

export const MobileNavBar = () => {
  const routes = useRoutes();

  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="w-full fixed z-40 bottom-0 flex justify-center items-center border-t-[1px] bg-white lg:hidden">
      {routes.map((item) => (
        <MobileItem
          key={item.label}
          label={item.label}
          href={item.href}
          icon={item.icon}
          active={item.active}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};
