'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

export const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const onClickHandler = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li>
      <Button
        onClick={onClickHandler}
        variant={'outline'}
        size={'icon'}
        className={cn(
          `leading-6 text-sm text-gray-500 font-semibold hover:text-black hover:bg-gray-100`,
          active && 'bg-gray-100 text-black'
        )}
      >
        <Link href={href}>
          <Icon className="h-6 w-6 shrink-0" />
          <span className="sr-only">{label}</span>
        </Link>
      </Button>
    </li>
  );
};
