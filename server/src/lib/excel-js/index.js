import { validateExcel } from '@utils';
const ExcelJS = require('exceljs');

export const columnLetterToNumber = (column) => {
  let columnNumber = 0;
  for (let i = 0; i < column.length; i++) {
    columnNumber = columnNumber * 26 + (column.charCodeAt(i) - 64);
  }
  return columnNumber;
};

export const getCol = (col = 'A', number) => {
  if (number === 0) return col;
  if (col[1]) {
    const co = String.fromCharCode(col[1].charCodeAt(0) + number);
    col = `${col[0]}${co}`;
  } else {
    if (number < 26) {
      col = String.fromCharCode(col.charCodeAt(0) + number);
    } else {
      const arrz = ['', 'A', 'B', 'C', 'D', 'E', 'F'];
      const i = Math.floor(number / 26);
      col = arrz[i] + String.fromCharCode(col.charCodeAt(0) + (number - 26 * i));
    }
  }
  return col;
};

export const handleFileExcel = async (file, attributes = []) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    const sheet = workbook.getWorksheet(1);
    const rowsData = [];

    sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 1) {
        const object = {};
        attributes.forEach((a, index) => {
          object[a] = row.values[index + 1];
        });
        rowsData.push(object);
      }
    });
    return rowsData;
  } catch (error) {
    console.error('Error handling Excel file:', error);
    return [];
  }
};

export const convertToExcel = async (data, options = {}) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');
  const rowWidths = options.width_col ? {} : fitToColumn(data, options.from_row || 0, options.from_col || 0, options.to_row || 9999);
  const widthPerCol = options.width_per_col || [];
  let max = 0,
    maxValue = 0;
  data.forEach((row, rowIndex) => {
    row = row.map((r) => {
      if (!r && r !== 0) return '';
      else return r;
    });
    const excelRow = worksheet.getRow(rowIndex + 1);
    excelRow.values = row;
    if (row.length > maxValue) {
      maxValue = row.length;
      max = rowIndex;
    }

    let height = 24;
    let maxLineCount = 1;
    row.forEach((value, colIndex) => {
      height = 24;
      const cell = worksheet.getCell(rowIndex + 1, colIndex + 1); // Lấy ô tương ứng
      const valuez = String(cell.value);
      if (valuez.includes('\n')) {
        const lineCount = valuez.split('\n').length;
        maxLineCount = Math.max(maxLineCount, lineCount);
        cell.alignment = { wrapText: true };
      }
      cell.font = {
        name: 'Times New Roman' // Tên font
      };
      if (options.format && rowIndex === 0) {
        cell.font = {
          name: 'Times New Roman',
          bold: true
        };
        cell.alignment = {
          horizontal: 'center',
          vertical: 'middle'
        };
      }
    });
    worksheet.getRow(rowIndex + 1).height = 24 * maxLineCount;
    if (rowIndex >= (options.from_row_border || 0) && rowIndex <= (options.to_row_border || 9999)) {
      excelRow.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    }
  });
  if (widthPerCol && widthPerCol[0]) {
    let col = 'A';
    for (let i = 0; i < widthPerCol.length; i++) {
      let z;
      if (i < 26) {
        z = String.fromCharCode(col.charCodeAt(0) + i);
      } else {
        z = col + String.fromCharCode(col.charCodeAt(0) + (i - 26));
      }
      worksheet.getColumn(z).width = widthPerCol?.find((rw) => rw.column === z)?.width || 20;
    }
  } else {
    for (let i = 0; i < data[max].length + 1; i++) {
      worksheet.getColumn(getCol('A', i)).width = options.width_col || rowWidths[i];
    }
  }
  if (options.mergeCells && options.mergeCells[0]) {
    options.mergeCells.forEach((m) => worksheet.mergeCells(m));
  }

  if (options.number_formats && options.number_formats[0]) {
    options.number_formats.forEach((a) => {
      if (typeof a === 'object') {
        for (let key in a) {
          worksheet.getCell(key).numFmt = a[key];
        }
      }
    });
  }
  if (options.formatz && options.formatz.row && options.formatz.column) {
    const startRow = options.formatz.row;
    const startColumn = columnLetterToNumber(options.formatz.column); // Chuyển "C" thành số

    worksheet.eachRow((row, rowIndex) => {
      if (rowIndex >= startRow) {
        row.eachCell((cell, colIndex) => {
          if (colIndex >= startColumn) {
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
          }
        });
      }
    });
  }
  if (options.widthz && options.widthz.size && options.widthz.column) {
    const startColumn = columnLetterToNumber(options.widthz.column); // Chuyển "C" thành số
    for (let colIndex = startColumn; colIndex <= worksheet.columnCount; colIndex++) {
      worksheet.getColumn(colIndex).width = options.widthz.size;
    }
  }
  if (options.alignments && options.alignments[0]) {
    options.alignments.forEach((a) => {
      if (typeof a === 'object') {
        for (let key in a) {
          worksheet.getCell(key).alignment = { ...a[key], ...worksheet.getCell(key).alignment };
        }
      }
    });
  }
  if (options.colors && options.colors[0]) {
    options.colors.forEach((c) => {
      if (typeof c === 'object') {
        for (const key in c) {
          if (Array.isArray(c[key])) {
            c[key].forEach((ck) => {
              const cell = worksheet.getCell(ck);
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: key }
              };
            });
          }
        }
      }
    });
  }
  if (options.fonts && options.fonts[0]) {
    options.fonts.forEach((a) => {
      if (typeof a === 'object') {
        for (let key in a) {
          worksheet.getCell(key).font = { ...a[key], name: 'Times New Roman' };
        }
      }
    });
  }
  if (options.outlineLevels && options.outlineLevels[0]) {
    options.outlineLevels.forEach((o) => {
      worksheet.getRow(o).outlineLevel = 1;
    });
  }

  if (options.images && options.images[0]) {
    for (let i = 1; i <= 10; i++) {
      worksheet.getRow(i).height = 20;
    }
    let index = 1;
    for (let image of options.images) {
      const imageUrl = image.url;
      const attachmentBuffer = await downloadFileAsBuffer(imageUrl);
      const imageId = workbook.addImage({
        buffer: attachmentBuffer,
        extension: 'jpeg' // hoặc 'png' tùy vào định dạng ảnh
      });
      worksheet.addImage(imageId, image.position);
      index += 1;
    }
  }

  return workbook.xlsx.writeBuffer();
};

export const fitToColumn = (arrayOfArray, fromRow, from_col, toRow) => {
  const result = [];
  arrayOfArray.forEach((array, index) => {
    if (index >= fromRow && index <= toRow) {
      array.forEach((a, i) => {
        if (i >= from_col) {
          if (String(a).includes('\n')) {
            const arr = String(a).split('\n');
            arr.forEach((a) => {
              if (Array.isArray(result[i])) result[i].push(String(a).length * 1.1);
              else result[i] = [String(a).length * 1.1];
            });
          } else {
            if (Array.isArray(result[i])) result[i].push(String(a).length * 1.1);
            else result[i] = [String(a).length * 1.1];
          }
        }
      });
    }
  });
  return result.map((r) => Math.max(...r));
};

export const excelDateToJSDate = (excelDate) => {
  try {
    if (!excelDate) {
      return false;
    }
    if (typeof excelDate === 'number') {
      return new Date(Math.round((excelDate - 25569) * 86400 * 1000));
    } else if (typeof excelDate === 'string' && validateExcel(excelDate)) {
      const c = excelDate.split('/');
      let u = [];
      for (let i = c.length - 1; i >= 0; i--) {
        u.push(c[i]);
      }
      let date = new Date(u.join('-'));
      if (isNaN(date.getTime())) {
        return false;
      }
      return date;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
