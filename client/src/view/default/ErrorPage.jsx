import { Buttonz } from '@components/core';
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen overflow-hidden">
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-full sm:px-8 flex flex-col items-center justify-center">
          <h1 className="font-bold text-5xl mb-2 text-primary">Error Occured</h1>
          <div className="mb-5">Liên kết không tồn tại</div>
          <img src="/images/errorPage.svg" alt="Error Occured" className="mb-5" width="50%" />
          <Buttonz className="mb-6" onClick={() => navigate(-1)} label="Trở lại" />
        </div>
      </div>
    </div>
  );
};
