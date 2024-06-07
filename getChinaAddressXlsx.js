import XLSX from 'xlsx';
import address from './address.json';

import getAddressList from './getAddressList';

const getChinaAddressXlsx = ({jsonTitle = [{title: '区', key: 'area'},{title: '市', key: 'city'},{title: '省', key: 'province'}], fileName = 'file.xlsx'}) => {
  const jsonData = jsonTitle.map(item => item.title);

  Object.keys(address.province.list).filter(item => !['provinces', 'municipality'].includes(item)).forEach(item => {
    getAddressList(item).forEach((city) => {
      getAddressList(city.code).forEach(area => {
        const addressMap = {
          area: area.name,
          city: city.name,
          province: address.province.list[item].name,
        }
        jsonData.push(jsonTitle.map(({key}) => addressMap[key]));
      })
    })
  })

  // 创建工作簿和工作表
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(jsonData, {skipHeader: true});

  // 将工作表添加到工作簿
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  // 写文件
  XLSX.writeFile(workbook, fileName);
};

export default getChinaAddressXlsx;
