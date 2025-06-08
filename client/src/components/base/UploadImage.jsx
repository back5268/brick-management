import { TrashIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { convertFileToUrl } from '@lib/helper';
import { Buttonz, Imagez } from '@components/core';
import { IMAGE_TYPE } from '@constant';
import { useToastState } from '@store';

export const UploadImage = ({ data, setData, label, isView, className = '' }) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(data);
  const { showToast } = useToastState();

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!IMAGE_TYPE.includes(acceptedFiles[0]?.type)) return showToast({ title: "Vui lòng chỉ chọn hình ảnh!", severity: 'warning' });
      setFile(acceptedFiles);
      setData(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  useEffect(() => {
    if (!data) setFileUrl(null);
    else if (typeof data === 'string') setFileUrl(data);
  }, [data]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={`card flex flex-col cursor-pointer m-2 ${className}`}>
      <div className="mb-4">
        {label && <label className="inline-block font-medium text-left">{label}</label>}
        <hr />
      </div>
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <div className="flex flex-col justify-center items-center gap-4 h-72">
          <Imagez src={fileUrl} alt={label} className="h-40 w-40 overflow-hidden" />
          <span className="w-full line-clamp-2 text-center">{fileUrl}</span>
          <div className="flex gap-2 items-center justify-center">
            <div {...getRootProps()}>
              <Buttonz label="Đổi" />
            </div>
            <Buttonz severity="danger" outlined className="p-2" onClick={() => setData(null)}>
              <TrashIcon className="w-6" />
            </Buttonz>
          </div>
        </div>
      ) : (
        <div {...getRootProps()} className="flex justify-center flex-col gap-4 text-center items-center p-2 h-72">
          <CloudArrowUpIcon className="w-32" />
          <span className="font-medium">Kéo và thả ảnh tại đây</span>
          <div className="w-full flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-border after:mt-0.5 after:flex-1 after:border-t after:border-border">
            <p className="mx-4 mb-0 text-center font-semibold">OR</p>
          </div>
          <Buttonz label="Chọn file" />
        </div>
      )}
    </div>
  );
};
