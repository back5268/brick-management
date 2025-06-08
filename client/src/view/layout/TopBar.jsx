import { Buttonz } from '@components/core';
import { Bars3Icon } from '@heroicons/react/24/outline';
import React from 'react';
import { NotifySection } from './NotifySection';
import { AvatarSection } from './AvatarSection';

export const TopBar = (props) => {
  const { showSidebar, setShowSidebar, onSignOut } = props;

  return (
    <div className="fixed top-0 inset-x-0 px-6 z-20 border-b border-border py-1 bg-white">
      <div className={`h-14 transition-all duration-500 ease-in-out bg-white ${showSidebar ? 'lg:ml-[17rem]' : ''}`}>
        <div className="flex justify-between items-center h-full">
          <Buttonz
            onClick={() => setShowSidebar(!showSidebar)}
            className="!p-0 h-9 w-9 flex justify-center items-center"
            icon={<Bars3Icon className="w-6 stroke-1" />}
          />
          <div className="flex gap-3 justify-between items-center mr-2">
            <NotifySection />
            <AvatarSection onSignOut={onSignOut} />
          </div>
        </div>
      </div>
    </div>
  );
};
