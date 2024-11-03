'use client';

import clsx from 'clsx';
import { useConversation } from '@/hooks/useConversation';
import EmptyState from '@/components/EmptyState';

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx('lg:pl-80 h-full lg:block', isOpen ? 'block' : 'hidden')}
    >
      <EmptyState />
    </div>
  );
}