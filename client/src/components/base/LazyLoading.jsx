import { ProgressBarz } from '@components/core';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const LazyLoading = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    loading && (
      <div className="fixed z-[1050] inset-x-0 top-0 h-2">
        <ProgressBarz mode="indeterminate" style={{ height: '6px' }}></ProgressBarz>
      </div>
    )
  );
};
