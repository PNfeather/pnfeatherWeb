import XLSX from 'xlsx';

const file2Xce = (file) => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      const data = e.target.result;
      let wb = XLSX.read(data, {
        type: 'binary'
      });
      const result = [];
      wb.SheetNames.forEach((sheetName) => {
        result.push({
          sheetName: sheetName,
          sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
        });
      });
      resolve(result);
    };
    reader.readAsBinaryString(file.raw);
  });
};

const formatExcelTime = (numb, format = '-') => {
  const time = new Date((numb - 1) * 24 * 3600000 + 1);
  time.setYear(time.getFullYear() - 70);
  const year = time.getFullYear() + '';
  const month = time.getMonth() + 1 + '';
  const date = time.getDate() - 1 + '';
  if (format && format.length === 1) {
    return year + format + month + format + date;
  }
  return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date);
};

export {
  file2Xce,
  formatExcelTime
};
