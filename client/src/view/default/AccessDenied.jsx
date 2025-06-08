import { Buttonz } from '@components/core';
import { useNavigate } from 'react-router-dom';

export const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen overflow-hidden">
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-full sm:px-8 flex flex-col items-center justify-center">
          <h1 className="font-bold text-5xl mb-2 text-primary">Access Denied</h1>
          <div className="mb-5">Bạn không có quyền truy cập</div>
          <img src="/images/permissionPage.svg" alt="Access Denied" className="mb-5" width="50%" />
          <Buttonz className="mb-6" onClick={() => navigate(-1)} label="Trở lại" />
        </div>
      </div>
    </div>
  );
};
