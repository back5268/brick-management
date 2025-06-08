import React, { useEffect, useState } from 'react';
import { useToastState, useUserState } from '@store';
import { SideBar } from './SideBar';
import { TopBar } from './TopBar';

export const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { clearUserInfo, setLoadingz } = useUserState();
  const { showToast } = useToastState();

  const onSignOut = () => {
    clearUserInfo();
    localStorage.removeItem('token');
    showToast({ title: 'Đăng xuất thành công', severity: 'success' });
    setLoadingz();
  };

  useEffect(() => {
    const checkWindowSize = () => {
      if (window.innerWidth < 1024) setShowSidebar(false);
      else setShowSidebar(true);
    };
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  return (
    <div className="antialiased">
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-x-0 inset-y-0 bg-black bg-opacity-50 z-30 w-screen h-screen block lg:hidden"
        ></div>
      )}
      <TopBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} onSignOut={onSignOut} />
      <SideBar showSidebar={showSidebar} onSignOut={onSignOut} />
      <div className={`relative transition-all duration-500 ease-in-out py-8 px-6 mt-14 ${showSidebar ? 'lg:ml-[17rem]' : ''}`}>{children}</div>
    </div>
  );
};
