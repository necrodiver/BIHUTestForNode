const xlsx = require('xlsx');
const fs = require('fs');
const moment = require('moment');
const BasePath = "./public/xls/";
module.exports = {
    getUserAllList: function (path) { //获取考勤数据
        var excelJson = this.excelToDataTable(path, true);
        if (excelJson == {}) {
            return null;
        }
        let userNames = [];
        excelJson.forEach(item => {
            if (userNames.indexOf(item.UserName) < 0) {
                userNames.push(item.UserName);
            }
        });
        let userList = {};
        userNames.forEach(item => {
            let listChild = excelJson.filter(e => {
                return e.UserName == item;
            });
            let thisUserList = this.DisPoseUser(listChild);
            userList[item] = thisUserList;
        });
        return userList;
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
                        headers[col] = "PunchCardTime";
                    }
                    return;
                }
                if (!data[row - firstNum]) {
                    data[row - firstNum] = {};
                }
                data[row - 1][headers[col]] = value;
            });
        let lastData = [];
        for (let index in data) {
            lastData.push(data[index]);
        }
        return lastData;
    },
    DisPoseUser: function (list1) {
        let last = moment(list1[0].PunchCardTime, "YYYY/MM/DD HH:mm:ss");
        let days = last.daysInMonth();
        let userList = [];
        for (let i = 1; i <= days; i++) {
            let thisTime = null;
            let isRight = false;
            let initDate = last.year() + '/' + (last.month() + 1) + '/' + i;
            let today = moment(initDate, "YYYY/MM/DD").weekday();
            for (let j = 0; j < list1.length; j++) {
                if (moment(list1[j].PunchCardTime, "YYYY/MM/DD HH:mm:ss").get('D') == i) {
                    isRight = true;
                    thisTime = list1[j].PunchCardTime;
                    var singleModel = userList.filter(u => {
                        return u.putCaredTime == moment(list1[j].PunchCardTime, "YYYY/MM/DD HH:mm:ss").format('YYYY-MM-DD HH:mm:ss');
                    });
                    if (singleModel && singleModel.length > 0) {
                        continue;
                    }
                    let userchildJson = this.ProofTime(thisTime, today);
                    let isLastDay = userchildJson.isLastDay;
                    let userchild = userchildJson.userchild;
                    if (userchild.day == 0) {
                        continue;
                    }
                    if (isLastDay) {
                        if (list1.length > j + 2 && moment(list1[j + 1].PunchCardTime, "YYYY/MM/DD HH:mm:ss").get('D') != i && moment(list1[j + 2].PunchCardTime, "YYYY/MM/DD HH:mm:ss").get('D') != i) {
                            userList.push({
                                day: i,
                                putCaredTime: moment('0001-01-01').format('YYYY-MM-DD HH:mm:ss'),
                                status: 0,
                                isLeftTime: null,
                                dayOfWeek: today
                            });
                        }
                    }
                    userList.push(userchild);
                }
            }
            if (thisTime == null && !isRight) {
                if (today == 0) {
                    userList.push({
                        day: i,
                        putCaredTime: moment('0001-01-01', "YYYY/MM/DD").format('YYYY-MM-DD HH:mm:ss'),
                        status: 100,
                        isLeftTime: null,
                        dayOfWeek: 7
                    });
                } else if (this.IsHolidayByDateSix(last.add(1 - last.get('D'), 'day').add(i - 1, 'day'))) {
                    userList.push({
                        day: i,
                        putCaredTime: moment('0001-01-01', "YYYY/MM/DD").format('YYYY-MM-DD HH:mm:ss'),
                        status: 100,
                        isLeftTime: null,
                        dayOfWeek: 6
                    });
                } else if (this.IsHolidayByDate(last.add(1 - last.get('D'), 'day').add(i - 1, 'day'))) {
                    userList.push({
                        day: i,
                        putCaredTime: moment('0001-01-01', "YYYY/MM/DD").format('YYYY-MM-DD HH:mm:ss'),
                        status: 100,
                        isLeftTime: null,
                        dayOfWeek: today
                    });
                } else {
                    userList.push({
                        day: i,
                        putCaredTime: moment('0001-01-01', "YYYY/MM/DD").format('YYYY-MM-DD HH:mm:ss'),
                        status: 0,
                        isLeftTime: null,
                        dayOfWeek: today
                    });
                }
            }
            if (i == 1 && thisTime && moment(thisTime, "YYYY/MM/DD HH:mm:ss").hour() < 8 && moment(list1[i + 1].PunchCardTime, "YYYY/MM/DD HH:mm:ss").get('D') != i && moment(list1[i + 2].PunchCardTime, "YYYY/MM/DD HH:mm:ss").get('D') != i) {
                userList.push({
                    day: i,
                    putCaredTime: moment('0001-01-01', "YYYY/MM/DD").format('YYYY-MM-DD HH:mm:ss'),
                    status: 0,
                    isLeftTime: null,
                    dayOfWeek: today
                });
            }
            let lastuserList = userList.filter(item => {
                return item.day == i;
            });
            if (!lastuserList || lastuserList.length <= 0) {
                userList.push({
                    day: i,
                    putCaredTime: moment('0001-01-01', "YYYY/MM/DD").format('YYYY-MM-DD HH:mm:ss'),
                    status: 0,
                    isLeftTime: null,
                    dayOfWeek: today
                });
            }
        }
        let userAll = {};
        userList.forEach(item => {
            let key = "day_" + item.day;
            let userChild = {};
            if (!userAll[key]) {
                userAll[key] = userChild;
            }
            userAll[key].day = item.day;
            userAll[key].dayOfWeek = item.dayOfWeek;
            if (item.status == 0) {
                userAll[key].status = 0;
            } else if (item.status == 100) {
                userAll[key].status = 2;
            } else {
                userAll[key].status = 1;
            }
            if (item.isLeftTime == true) {
                userAll[key].UserLeft = {};
                userAll[key].UserLeft.putCaredTime = item.putCaredTime;
                userAll[key].UserLeft.status = item.status;
            } else if (item.isLeftTime == false) {
                userAll[key].UserRight = {};
                userAll[key].UserRight.putCaredTime = item.putCaredTime;
                userAll[key].UserRight.status = item.status;
            } else {
                userAll[key].UserLeft = null;
                userAll[key].UserRight = null;
            }
        });
        return userAll;
    },
    ProofTime: function (thisTime, today) {
        let isLastDay = false;
        let userModel = {};
        let todayTime = moment(thisTime, "YYYY/MM/DD HH:mm:ss");
        let day = todayTime.get('D');
        let hour = todayTime.hour();
        let minute = todayTime.minute();
        let dayOfWeek = parseInt(todayTime.weekday());

        userModel.putCaredTime = todayTime.format('YYYY-MM-DD HH:mm:ss');
        userModel.day = day;
        userModel.dayOfWeek = today;
        if (hour >= 6 && hour < 14) {
            userModel.isLeftTime = true;
            if ((hour == 9 && minute > 30) > 30 || hour >= 10) {
                userModel.status = -3;
            }
            if ((hour >= 7 && hour < 9) || (hour == 9 && minute <= 30)) {
                userModel.status = 1;
            }
        }
        if (hour >= 14 || hour <= 6) {
            userModel.isLeftTime = false;
            if (hour >= 14 && hour < 21) {
                if (hour < 6) {
                    userModel.status = -2;
                } else {
                    userModel.status = -1;
                }
            }
            if (hour == 21) {
                userModel.status = 1;
            }
            if (((hour == 22) || (hour == 23)) && hour < 24) {
                userModel.status = 2;
            }
            if (hour >= 0 && hour <= 6) {
                userModel.day -= 1;
                if (userModel.dayOfWeek > 1) {
                    userModel.dayOfWeek -= 1;
                } else {
                    userModel.dayOfWeek = 7;
                }

                userModel.status = 2;
                isLastDay = true;
            }
            if (dayOfWeek == 6 && hour >= 18) {
                userModel.status = 1;
            }
        }
        return {
            userchild: userModel,
            isLastDay: isLastDay
        };
    },
    IsHolidayByDateSix: function (date) {
        let thisTime = date;
        let year = thisTime.year();
        let month = thisTime.get('month') + 1;
        let day = thisTime.get('D');
        let thisYear = moment().get('year');
        //以下为单双休日期
        if (month == 3 && (day == 10 || day == 31)) {
            return true;
        }
        if (month == 3 && (day == 10 || day == 24)) {
            return true;
        }
        if (month == 4 && day == 14) {
            return true;
        }
        if (month == 5 && (day == 12 || day == 26)) {
            return true;
        }
        if (month == 6 && (day == 9 || day == 16 || day == 30)) {
            return true;
        }
        if (month == 7 && (day == 1 || day == 8 || day == 14 || day == 15 || day == 22 || day == 28 || day == 29)) {
            return true;
        }
        if (month == 8 && (day == 11 || day == 25)) {
            return true;
        }
        if (month == 9 && (day == 15 || day == 29)) {
            return true;
        }
        if (month == 10 && (day == 13 || day == 27)) {
            return true;
        }
        if (month == 11 && (day == 10 || day == 24)) {
            return true;
        }
        if (month == 12 && (day == 15 || day == 29)) {
            return true;
        }
        return false;
    },
    IsHolidayByDate: function (date) {
        let thisTime = date;
        let year = thisTime.year();
        let month = thisTime.get('month') + 1;
        let day = thisTime.get('D');
        let thisYear = moment().get('year');
        if (year == thisYear) {
            if (month == 1 && day == 1) {
                return true;
            }
            if (month == 2 && (day == 15 || day == 16 || day == 17 || day == 18 || day == 19 || day == 20 || day == 21)) {
                return true;
            }
            if (month == 4 && (day == 5 || day == 6 || day == 7 || day == 29 || day == 30)) {
                return true;
            }
            if (month == 5 && day == 1) {
                return true;
            }
            if (month == 6 && day == 18) {
                return true;
            }
            if (month == 10 && (day >= 1 && day < 8)) {
                return true;
            }
        }
        return false;
    }

};