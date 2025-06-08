import { getInfoApi } from '@api';
import { ProgressSpinnerz } from '@components/core';
import { useUserState } from '@store';
import { Fragment, useEffect, useState } from 'react';

export const AuthProvider = ({ children }) => {
  const { setUserInfo, loadingz } = useUserState();
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
      } else localStorage.removeItem('token');
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) checkAuth();
    else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [loadingz]);

  if (loading)
    return (
      <div className="absolute w-full h-full bg-black opacity-30 z-10 flex justify-center items-center">
        <ProgressSpinnerz style={{ width: '50px', height: '50px' }} strokeWidth="6" animationDuration="1s" />
      </div>
    );

  return <Fragment>{children}</Fragment>;
};
