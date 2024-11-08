'use client';

import Link from 'next/link';
import clsx from 'clsx';

interface MobileItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

export const MobileItem: React.FC<MobileItemProps> = ({
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
    <Link
      href={href}
      onClick={onClickHandler}
      className={clsx(
        `flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100`,
        active && 'bg-gray-100 text-black'
      )}
    >
      <Icon className="h-6 w-6" />
      <label className="sr-only">{label}</label>
    </Link>
  );
};
