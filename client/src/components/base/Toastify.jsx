import { useToastState } from '@store';
import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toastify = () => {
  const { show, toastInfo = {}, hideToast } = useToastState();
  let severity = ['info', 'success', 'warning', 'error', 'default'].includes(toastInfo.severity) ? toastInfo.severity : 'default';

  const notify = () => severity && toast[severity](toastInfo.title);
  useEffect(() => {
    if (show && severity && toastInfo.title) {
      notify();
      hideToast();
    }
  }, [show]);

  return (
    <div>
      <ToastContainer theme="colored" autoClose={toastInfo.duration || 4000} />
    </div>
  );
};
