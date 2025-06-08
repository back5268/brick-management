import React from 'react';

export const Logo = (props) => {
  const { className = '', classNameImg = 'h-20' } = props;

  return (
    <div className={`flex gap-4 justify-center items-center font-bold text-xl ${className}`}>
      <div className={classNameImg}>
        <img src="/images/logo.png" alt="Logo" className={classNameImg} />
      </div>
    </div>
  );
};
