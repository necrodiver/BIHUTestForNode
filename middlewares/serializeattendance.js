const Excel = require('exceljs');
const BasePath = __dirname + "/xls";
module.exports = {
    GetUserAllList: function () { //获取考勤数据

    },
    ExcelToDataTable: function (path, isFirstRowColumn) { //将excel中的数据导入Json中
        var workbook = new Excel.Workbook();
        workbook.xlsx.readFile(filename)
            .then(function () {
                // use workbook
            });
    },

};