import { ChevronRightIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Link } from 'react-router-dom';

export const NavItem = (props) => {
  const { item = {}, pathname = '', Icon } = props;
  const isSelected =
    pathname.includes('/warehouse-receipt') && item.route === '/warehouse-receipt'
      ? true
      : '/' === pathname || '/warehouse-receipt' === pathname || pathname.includes('/warehouse-receipt')
        ? pathname === item.route
        : item.route !== '/' && pathname.includes(item.route);

  const Fragment = ({ children }) => {
    const route = item.route;
    return <Link to={route}>{children}</Link>;
  };

  return (
    <Fragment>
      <div className={`p-[0.75rem] my-1 rounded-sm ${isSelected ? 'bg-primary font-semibold' : 'hover:bg-hoverSidebar'}`}>
        <div className="flex items-center gap-2 pl-2 text-[0.8rem]">
          {Icon ? <Icon className="h-3 w-3" /> : <ChevronRightIcon strokeWidth={4} className="h-3 w-3" />}
          <span>{item.name}</span>
        </div>
      </div>
    </Fragment>
  );
};
