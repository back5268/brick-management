import { Buttonz } from '@components/core';
import { ArrowPathIcon, UserIcon } from '@heroicons/react/24/outline';
import { useToastState, useUserState } from '@store';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Account } from './Account';

export const AvatarSection = () => {
  const { userInfo, setLoadingz, clearUserInfo } = useUserState();
  const { showToast } = useToastState();
  const ref = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) setIsShow(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onSignOut = () => {
    clearUserInfo();
    localStorage.removeItem('token');
    setTimeout(() => {
      showToast({ title: 'Đăng xuất thành công', severity: 'success' });
    }, 500);
    setLoadingz();
  };

  const items = [
    { label: 'Thông tin cá nhân', icon: UserIcon, onClick: () => setOpen(true) },
    { label: 'Đổi mật khẩu', icon: ArrowPathIcon, onClick: () => navigate('/auth/change-password') }
  ];

  return (
    <div ref={ref} className="relative items-center">
      <Account open={open} setOpen={setOpen} data={userInfo} />
      <Buttonz
        onClick={() => setIsShow(!isShow)}
        className="!p-0 h-10 w-10 flex justify-center items-center"
        icon={
          <div
            className={`relative cursor-pointer h-10 w-10 rounded-sm bg-cover`}
            style={{ backgroundImage: `url(${userInfo.avatar || '/images/avatar.jpg'})` }}
          >
            <span className="absolute top-0 left-0 w-full h-full bg-primary-500 opacity-10"></span>
          </div>
        }
      />
      <div
        className={`absolute right-0 mt-4 w-80 bg-white shadow-custom rounded-sm transition-all z-50
          duration-200 ease-in-out transform ${isShow ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <div className="px-4 mt-2">
          <div className="flex h-24 items-center">
            <div className="w-5/12 items-center flex justify-center">
              <div
                className="relative h-20 w-20 rounded-md bg-cover"
                style={{ backgroundImage: `url(${userInfo.avatar || '/images/avatar.jpg'})` }}
              ></div>
            </div>
            <div className="w-7/12 text-left flex flex-col gap-2 items-start">
              <h4 className="font-medium">{userInfo?.fullName}</h4>
              <p className="text-sm">{userInfo?.email}</p>
              <p className="text-sm">{userInfo?.phone}</p>
            </div>
          </div>
          <ul className="relative list-none mt-4">
            {items.map((item, index) => (
              <li key={index} onClick={() => item.onClick()}>
                <hr />
                <div
                  className={`flex h-12 cursor-pointer items-center truncate rounded-sm px-4 py-1 text-sm
                   outline-none transition duration-300 ease-in-out hover:bg-primary-100 hover:text-primary hover:font-semibold
                  hover:outline-none gap-2 my-1`}
                >
                  {item.icon && <item.icon className="w-6 h-6" />}
                  <span>{item.label}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 my-4">
            <Buttonz onClick={() => onSignOut()} className="w-full flex gap-2 truncate" label="Đăng xuất" />
          </div>
        </div>
      </div>
    </div>
  );
};
