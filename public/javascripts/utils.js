/**
 * Created by lijian on 2018/7/11.
 */
var utils= {

    getNowFormatDate:function(time,symbol) {
        var date;
        if(time){
            date = new Date(time);
        }else{
            date = new Date();
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        symbol?symbol:symbol='-';
        var currentdate = year + symbol + month + symbol + strDate;
        return currentdate;
    },
/**
 * 激励总数单位
 * @param num2 奖励方式
 */
    incAmount:function(num1,num2){
        var incAmount;
        if (!num1 || isNaN(num1)||!num2 || isNaN(num2))
            return '';
        if(num2 !=2 ){
            return incAmount= num1+'万份'
        }else{
            return incAmount= num1+'万股'
        }
        return incAmount
    },
    addPer:function (num) {
    return num ? (num>=0.01?num.toFixed(2) + "%":'<0.01%') : '--';
    },

//股权激励字段说明
    incType:function (num) {
        var incType;
        if (!num || isNaN(num))
            return '';
        if (num == 1)
            incType = '股东转让股票';
        else if (num == 2)
            incType = '股票增值权';
        else if (num == 3)
            incType = '上市公司定向发行股票';
        else if (num == 4)
            incType = '上市公司提取激励基金买入流通A股';
        else if (num == 5)
            incType = '授予期权,行权股票源为股东转让股票';
        else if (num == 6)
            incType = '授予期权,行权股票来源为上市公司定向发行股票';
        return incType;
    },
//股权激励字段说明
    incSubject:function (num) {
        var incSubject;
        if (!num || isNaN(num))
            return '';
        if (num == 1)
            incSubject = '期权';
        else if (num == 2)
            incSubject = '股票';
        else if (num == 3)
            incSubject = '股票增值权';
        return incSubject;
    },
    //处理小于0.00001的数值加"%"
    addPerForMin:function (hldAmount,hldPercent) {
        return hldAmount ? (hldPercent?(hldPercent>=0.01?hldPercent.toFixed(2) + "%":'<0.01%'):'<0.01%') : '--';
    },
    getStrAmount:function(lastHolder){
         var strAmount = '';
         if (!lastHolder) {
                  strAmount = '';
             }else if (lastHolder.chanOfLast > 10){
                  strAmount = '增加';
             }else if (lastHolder.chanOfLast < -10){
                  strAmount = '减少';
             }else{strAmount = '稳定';}
         return strAmount
            }


};
module.exports = utils;

