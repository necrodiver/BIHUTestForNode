const xlsx = require('xlsx');
const fs = require('fs');
const BasePath = "./public/xls/";
module.exports = {
    getUserAllList: function (path) { //获取考勤数据
        var excelJson = this.excelToDataTable(path, true);
        return null;
    },
    excelToDataTable: function (path, isFirstRowColumn) { //将excel中的数据导入Json中
        let workbook = xlsx.readFile(path);
        let sheetNames = workbook.SheetNames;
        let worksheet = workbook.Sheets[sheetNames[0]];
        let headers = {};
        let data = {};
        let keys = Object.keys(worksheet);
        let firstNum = 1;
        if (!isFirstRowColumn) {
            firstNum = 0;
        }
        keys
            .filter(k => k[0] !== '!')
            .forEach(k => {
                let col = k.substring(0, 1);
                let row = parseInt(k.substring(1));
                let value = worksheet[k].v;
                if (row === 1 && isFirstRowColumn) {
                    if (col === 'A') {
                        headers[col] = "UserName";
                    } else if (col === 'B') {
                        headers[col] = "MarkTime";
                    }
                    return;
                }
                if (!data[row - firstNum]) {
                    data[row - firstNum] = {};
                }
                data[row - 1][headers[col]] = value;
            });
        return data;
    },

};