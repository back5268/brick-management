import { Buttonz, Dialogz } from '@components/core';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { removeSpecialCharacter } from '@lib/helper';
import { useToastState } from '@store';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';

export const Import = (props) => {
  const { showToast } = useToastState();
  const { title, action, template, open, setOpen = () => {}, handleSuccess = () => {} } = props;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectFile, setSelectFile] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      const name = acceptedFiles[0]?.name;
      const isExcelFile = /\.(xlsx|xls)$/i.test(name);
      if (!isExcelFile) return showToast({ title: 'Vui lòng chỉ chọn file excel!', severity: 'warning' });
      setFile(acceptedFiles);
      setSelectFile(name);
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  useEffect(() => {
    if (!open) {
      setFile(null);
      setSelectFile('');
    }
  }, [open]);

  const onSubmit = async () => {
    if (file) {
      const params = { formData: { file } };
      setLoading(true);
      const response = await action(params);
      setLoading(false);
      if (response) {
        handleSuccess();
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(response);
        downloadLink.download = (title && `ket-qua-import-${removeSpecialCharacter(title)}.xlsx`) || 'data.xlsx';
        downloadLink.click();
        showToast({ title: `Import ${title} thành công!`, severity: 'success' });
      }
    } else showToast({ title: 'Vui lòng chọn file excel!', severity: 'error' });
  };

  return (
    <Dialogz open={open} setOpen={setOpen} header={'Import ' + title}>
      <div className="justify-content-center text-center py-6 border-t border-border">
        <input {...getInputProps()} className="cursor-pointer" />
        <div className="w-full flex justify-center">
          <div className="flex justify-center w-64 cursor-pointer" {...getRootProps()}>
            {selectFile ? (
              <Buttonz label="Đổi File" />
            ) : (
              <div className="flex justify-center flex-col items-center">
                <CloudArrowUpIcon className="w-20" />
                <span className="font-medium">Chọn hoặc kéo thả file tại đây</span>
              </div>
            )}
          </div>
        </div>
        {selectFile && <div className="mt-2">Select file: {selectFile}</div>}
      </div>
      <hr />
      <div className="flex gap-4 justify-center py-4">
        <Buttonz
          label="Bỏ chọn file"
          outlined
          severity="danger"
          onClick={() => {
            setFile(null);
            setSelectFile('');
          }}
        />
        <Link to={import.meta.env.VITE_API_URL + '/import' + template}>
          <Buttonz severity="warning" label="Tải file mẫu" />
        </Link>
        <Buttonz onClick={async () => await onSubmit()} loading={loading}>
          Xác nhận
        </Buttonz>
      </div>
    </Dialogz>
  );
};
