import { getListNotifyApi, readAllNotifyApi, readNotifyApi, viewAllNotifyApi } from '@api';
import { Buttonz } from '@components/core';
import { BellIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { socket } from '@lib/socket-io';
import { useItemState, useToastState, useUserState } from '@store';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotifySection = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [render, setRender] = useState(false);
  const { userInfo } = useUserState();
  const { showToast } = useToastState();
  // const { data } = useGetApi(getListNotifyApi, { render }, 'notify');
  const data = [];
  const numberView = data?.filter((d) => d.status === 0)?.length;
  const { setItem } = useItemState();

  const handleClickOutside = (e) => ref.current && !ref.current.contains(e.target) && setIsShow(false);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (userInfo?._id) {
      const key = `notify_${userInfo?._id}`;
      const onConnect = () => console.log('Connecting...');
      const onDisconnect = (reason) => console.log('Disconnecting...', reason);
      const onEvent = (event) => {
        console.log(event);
        showToast({ title: event.content, severity: 'info' });
        setRender((pre) => !pre);
      };
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on(key, onEvent);
      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off(key, onEvent);
      };
    }
  }, [userInfo?._id]);

  const onClickNoti = async (item) => {
    if (item.status !== 2) await readNotifyApi({ _id: item._id });
    setIsShow(false);
    setRender((pre) => !pre);
    setItem({ application: item?.data?._id });
    switch (item.type) {
      case 1:
      case 2:
      case 3:
        return navigate('/application');
      case 4:
        return navigate('/salary');
      default:
        console.warn('Unhandled notification type:', item.type);
    }
  };

  return (
    <div ref={ref} className="relative items-center">
      <div className="relative">
        <Buttonz
          onClick={async () => {
            if (numberView > 0) {
              await viewAllNotifyApi();
              setRender((pre) => !pre);
            }
            setIsShow(!isShow);
          }}
          className="!p-0 h-9 w-9 flex justify-center items-center"
          icon={<BellIcon className="w-6 stroke-1" />}
        />
        {numberView > 0 && <span className="absolute top-2 right-2 block h-2 w-2 rounded-full ring-1 ring-primary-50 bg-red-400" />}
      </div>
      <div
        className={`absolute right-0 mt-4 w-96 bg-white shadow-custom rounded-sm transition-all z-50
          duration-200 ease-in-out transform ${isShow ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <div>
          <div className="flex justify-between items-center h-16 mb-0 mx-4">
            <h4 className="text-md">Thông báo</h4>
            <span
              onClick={async () => {
                await readAllNotifyApi();
                setRender((pre) => !pre);
              }}
              className="text-sm text-primary cursor-pointer hover:text-blue-800"
            >
              Đánh dấu đã đọc
            </span>
          </div>
          <hr />
          <div className="min-h-[32rem]">
            {data?.length > 0 ? (
              <>
                <div className="overflow-y-auto max-h-[70vh] text-gray-600">
                  <ul className="relative list-none">
                    <hr />
                    {data?.map((item, index) => (
                      <li key={index}>
                        <div className="w-full">
                          <div
                            onClick={() => onClickNoti(item)}
                            className={`flex cursor-pointer rounded-sm px-4 py-3 ${[0, 1].includes(item.status) ? 'bg-blue-50' : ''}
                                      text-sm hover:bg-blue-100 hover:text-primary hover:outline-none gap-4`}
                          >
                            <BellIcon className="h-8 w-8" />
                            <div className="flex flex-col gap-2">
                              <span>{item.content}</span>
                              <span className="text-xs">{formatDate(item.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <hr />
                <div className="h-16 text-gray-600 flex justify-center items-center">
                  <h5 className="font-medium">Bạn không có thông báo nào.</h5>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
