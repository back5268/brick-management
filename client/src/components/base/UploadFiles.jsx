import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Buttonz } from '@components/core';
import { Link } from 'react-router-dom';
import { IMAGE_TYPE } from '@constant';
import { useToastState } from '@store';

export const UploadFiles = (props) => {
  const { files = [], setFiles, label, max, isView, type, className = '' } = props;
  const { showToast } = useToastState();

  const removeFile = (item) => {
    setFiles(files.filter((f) => f !== item));
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      let newFiles = [...acceptedFiles];
      if (type === 'image') {
        let error = false;
        newFiles = newFiles.filter((file) => {
          if (!IMAGE_TYPE.includes(file.type)) error = true;
          return IMAGE_TYPE.includes(file.type);
        });
        if (error) return showToast({ title: 'Vui lòng chỉ chọn hình ảnh!', severity: 'warning' });
      }
      newFiles = [...newFiles, ...files];
      if (max) newFiles = newFiles.splice(0, max);
      setFiles(newFiles);
    },
    [JSON.stringify(files)]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={`p-2 w-full ${className}`}>
      <div className="card flex flex-col cursor-pointer">
        <div className={'flex justify-between items-center mb-2'}>
          {label && <label className="inline-block font-medium text-left">{label}</label>}
          {!isView && (
            <div className="flex gap-4">
              <Buttonz
                onClick={() => setFiles([])}
                severity="danger"
                outlined
                className="!p-0 h-10 w-10 flex justify-center items-center rounded-full"
                icon={<TrashIcon className="w-5" />}
              />
              <div {...getRootProps()}>
                <Buttonz label="Chọn files" />
              </div>
            </div>
          )}
        </div>
        <hr />
        <input {...getInputProps()} className="cursor-pointer" />
        {files?.length > 0 ? (
          <div className="flex justify-center flex-col gap-4 text-left mt-4">
            {files.map((f, index) => (
              <div key={index} className="card flex items-center justify-between !p-2">
                <Link to={typeof f === 'string' ? f : ''} target="_blank" className="text-sm text-primary">
                  {f?.name || f}
                </Link>
                {!isView && (
                  <Buttonz
                    onClick={() => removeFile(f)}
                    severity="danger"
                    outlined
                    className="!p-0 h-10 w-10 flex justify-center items-center rounded-full"
                    icon={<TrashIcon className="w-5" />}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div {...getRootProps()} className="text-center p-2 font-medium mt-4">
            <span>{isView ? 'Không có file' : 'Kéo và thả file tại đây'}</span>
          </div>
        )}
      </div>
    </div>
  );
};
