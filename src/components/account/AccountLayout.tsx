import React from 'react';
import { Outlet } from 'react-router-dom';
import AccountSidebar from './AccountSidebar';

const AccountLayout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <AccountSidebar />
        <main className="flex-1 dark:text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;