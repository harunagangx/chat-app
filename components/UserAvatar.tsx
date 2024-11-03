'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import useActiveList from '@/hooks/useActiveList';
import { User } from '@prisma/client';

interface UserAvatarProps {
  user?: User;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <Avatar className="relative">
        <AvatarImage
          src={user?.image || '/images/placeholder.jpg'}
          alt="avatar"
        />
      </Avatar>
      {isActive && (
        <span
          className="
            absolute
            block
            rounded-full
            bg-green-500
            ring-2
            ring-white
            top-0
            right-0
            h-2
            w-2
            md:h-3
            md:w-3
          "
        />
      )}
    </div>
  );
};
