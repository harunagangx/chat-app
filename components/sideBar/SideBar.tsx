import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { DesktopSideBar } from '@/components/sideBar/DesktopSideBar';
import { MobileNavBar } from '@/components/sideBar/MobileNavBar';

// eslint-disable-next-line @next/next/no-async-client-component
export default async function SideBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSideBar currentUser={currentUser} />
      <MobileNavBar />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}
