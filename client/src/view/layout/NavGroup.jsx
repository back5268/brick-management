import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { NavItem } from './NavItem';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Ripple } from 'primereact/ripple';
import { Link } from 'react-router-dom';

export const NavGroup = (props) => {
  const { value, item = {}, open, setOpen, pathname, Icon } = props;
  const nodeRef = useRef(null);
  const isOpen = open?.includes(value);
  const isItem = item.items?.filter((i) => i.showSidebar)?.length < 2;
  const route = item.items[0]?.route;
  const isSelected = '/' === pathname ? pathname === route : route !== '/' && pathname.includes(route);

  if (isItem) {
    return (
      <>
        <Link
          to={item.items[0]?.route}
          className={`flex p-ripple items-center justify-between w-full p-3 rounded-sm ${isSelected ? 'bg-primary' : 'hover:bg-hoverSidebar'}`}
        >
          <div className="flex items-center gap-2 text-[0.8rem]">
            {Icon && <Icon className="h-5 w-5" />}
            <span>{item.name}</span>
          </div>
          <Ripple />
        </Link>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() =>
          setOpen((pre) => {
            if (pre.includes(value)) return pre.filter((p) => p !== value);
            else return [...pre, value];
          })
        }
        className={`flex p-ripple items-center justify-between w-full p-3 rounded-sm ${isOpen ? 'bg-hoverSidebar text-onSidebar' : ''}`}
      >
        <div className="flex items-center gap-2 text-[0.8rem]">
          {Icon && <Icon className="h-5 w-5" />}
          <span>{item.name}</span>
        </div>
        {!isItem && <ChevronDownIcon strokeWidth={2.5} className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
        <Ripple />
      </button>
      <CSSTransition timeout={{ enter: 300, exit: 300 }} in={isOpen} classNames="menu-transition" unmountOnExit nodeRef={nodeRef}>
        <ul ref={nodeRef}>
          {item.items
            ?.filter((item) => item.showSidebar)
            ?.map((item, index) => (
              <NavItem item={item} key={index} pathname={pathname} />
            ))}
        </ul>
      </CSSTransition>
    </>
  );
};