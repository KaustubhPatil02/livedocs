'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/docActions/Header';

const HeaderWrapper = ({ docs, searchQuery, children }: { docs: { id: string; title: string }[]; searchQuery: string; children: React.ReactNode }) => {
  const pathname = usePathname();

  // Check if the pathname starts with "/documents/"
  if (pathname.startsWith('/documents/')) {
    return null; // Don't render the Header on /documents/[id]
  }

  return (
    <Header
      // className="sticky left-0 top-0"
      showSearch={true}
      docs={docs}
      searchQuery={searchQuery}
    >
      {children}
    </Header>
  );
};

export default HeaderWrapper;