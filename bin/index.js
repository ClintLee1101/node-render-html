var http = require('http');
var querystring = require('querystring')
var jade = require( 'jade' );
var qs = require('querystring');
var fs = require( 'fs' );
var utils=require('../public/javascripts/utils');
var  times=0;

var options = {
    flags: 'a',     // append模式
    encoding: 'utf8',  // utf8编码
};

var stdout = fs.createWriteStream('./stdout.log', options);
// var stderr = fs.createWriteStream('./stderr.log', options);
// 创建logger
// var logger = new console.Console(stdout, stderr);
var logger = new console.Console(stdout);
// 添加format方法
Date.prototype.format = function (format) {

    if (!format) {
        format = 'yyyy-MM-dd HH:mm:ss';
    }

    // 用0补齐指定位数
    var padNum = function (value, digits) {
        return Array(digits - value.toString().length + 1).join('0') + value;
    };

    // 指定格式字符
    var cfg = {
        yyyy: this.getFullYear(),             // 年
        MM: padNum(this.getMonth() + 1, 2),        // 月
        dd: padNum(this.getDate(), 2),           // 日
        HH: padNum(this.getHours(), 2),          // 时
        mm: padNum(this.getMinutes(), 2),         // 分
        ss: padNum(this.getSeconds(), 2),         // 秒
        fff: padNum(this.getMilliseconds(), 3),      // 毫秒
    };

    return format.replace(/([a-z]|[A-Z])(\1)*/ig, function (m) {
        return cfg[m];
    });
}

function crawler(marketType, stockCode) {
    var content = qs.stringify({
        marketType: marketType,
        stockCode: stockCode,
    });

    var options = {
        hostname: 'semantic-composite-service',
        port: 31001,
        path: '/stock/report/analysis?' + content,
        method: 'GET'
    };
    var req = http.request(options, function (res) {
        logger.log('STATUS2: ' + res.statusCode);
        var buffers = [];

        res.on('data', function(chunk) {
            buffers.push(chunk);
        });

        res.on('end', function(chunk) {
            logger.log(marketType, stockCode)
            var wholeData = Buffer.concat(buffers);
            var dataStr = wholeData.toString('utf8');
            var data = ''+wholeData
            var result = JSON.parse(data)
            if(result.message.code == 0){
                var resData = result.data.list
                if(resData.length==0){
                    logger.log('股票'+marketType+stockCode+'数据为空，未进行生成');
                    times++;
                    if(times<=stockResData.length-1){
                        startRender(times);
                    }
                    return;
                }
                // 数据重组
                var resObj = {}
                //传参 市场类型+股票代码
                resObj.symbol = marketType+stockCode
                resObj.stockCode=stockCode
                for(var i=0; i<resData.length; i++){
                    if(resData[i].parseType == '资金流向'){
                        resObj.flowFund = JSON.parse(resData[i].value)
                    }
                    if(resData[i].parseType == '机构评级'){
                        resObj.organRating = JSON.parse(resData[i].value)
                    }
                    if(resData[i].parseType == '财务指标'){
                        resObj.financialAnalysis = JSON.parse(resData[i].value)
                    }
                    if(resData[i].parseType == '公司概况'){
                        resObj.product = JSON.parse(resData[i].value)
                    }
                    if(resData[i].parseType == '个股所属行业推荐'){
                        resObj.recommends = JSON.parse(resData[i].value)
                    }
                    if(resData[i].parseType == '高管简介'){
                        resObj.executive = JSON.parse(resData[i].value)
                    }
                    if(resData[i].parseType == '股本结构'){
                        resObj.capStructure = JSON.parse(resData[i].value)
                    }
                    if(resData[i].parseType == '股权激励'){
                        resObj.incentive = JSON.parse(resData[i].value);
                    }
                    if(resData[i].parseType == '风险信息'){
                        resObj.riskNotices = JSON.parse(resData[i].value)
                    }

                    }
                resObj.product={};
                    //财务指标数据整理
                    var newData = {};
                    if(resObj.financialAnalysis){
                        resObj.financialAnalysis.forEach(function (item, index) {
                            /* debugger */
                            if(item.dimensions){
                                for (var i = 0, el = item.dimensions; i < el.length; i++) {
                                    var title = el[i].name;
                                    if (!newData[title]) {
                                        newData[title] = [{
                                            name: title,
                                            list: [title]
                                        }]
                                    }
                                    newData[title][0].list.push(utils.getNowFormatDate(item.endAt,'-'));
                                    /* debugger */
                                    for (var j = 0; j < el.length; j++) {
                                        if (el[j].name === title) {
                                            for (var k = 0; k < el[j].indicators.length; k++) {
                                                var itemValue = {
                                                    name: '',
                                                    list: [el[j].indicators[k].name]
                                                };
                                                if (itemValue.hasOwnProperty(el[j].indicators[k].name)) {
                                                } else {
                                                    itemValue.name = el[j].indicators[k].name;
                                                }
                                                if(index === 0 ){
                                                    itemValue.list.push(el[j].indicators[k].valueToDisplay);
                                                    newData[title].push(itemValue);
                                                }else{
                                                    newData[title][k+1].list.push(el[j].indicators[k].valueToDisplay);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                    resObj.financialNewData=newData;

                //概念题材
                var arr=[];
                if(resObj.recommends&&resObj.recommends.recommends.entries){
                    resObj.recommends.recommends.entries.forEach(function(val,index){
                        arr.push(val.term)
                    })
                }
                resObj.entries=arr.join('、');


                if(resObj.incentive){
                    resObj.incentive.forEach(function(val,index){
                        val.pubDateTime=utils.getNowFormatDate(val.pubDateTimestamp,'-');
                        val.incBeginTime=utils.getNowFormatDate(val.incBeginTimestamp);
                        val.incAmountFilter=utils.incAmount(val.incAmount,val.incSubject);
                        val.percent=utils.addPer(val.incTotsharePercent);
                        val.comeFrom=utils.incType(val.incType);
                        val.incSubjectFilter=utils.incSubject(val.incSubject);
                    })
                }


                var text='';
                //股权激励话术
                if(resObj.incentive){
                    text='公布股权激励方案，激励方式为授予'+utils.incSubject(resObj.incentive[0].incSubject)+ '，近一年公司业绩可能会有较大提升。'
                }
                //股本结构话术
                if(resObj.capStructure&&resObj.capStructure.amount&&resObj.capStructure.amount.shareholderAmountList){
                    var lastHolder = resObj.capStructure.amount.shareholderAmountList.length > 0 ? resObj.capStructure.amount.shareholderAmountList[0] : {};
                }
                if(lastHolder){
                    text+='股东人数近期数量'+utils.getStrAmount(lastHolder)+'。'
                }
                //财务分析话术
                if(resObj.financialAnalysis&&resObj.financialAnalysis.length > 0){
                    text+=resObj.financialAnalysis[0].conclusion+'。';
                }
                //机构关注话术
                if(resObj.organRating&&resObj.organRating.ratingResult){
                    var data = resObj.organRating.ratingResult;
                    var stockNum = data.stockNum;
                    var stockLevel = '';
                    if (stockNum !== 0) {
                        var stockPercent = (data.ranking / stockNum).toFixed(2);
                        if (stockPercent <= 0.3)
                        {
                            stockLevel = '机构关注度较高'
                        }else if (stockPercent > 0.3 && stockPercent <= 0.7) {
                            stockLevel = '机构关注度一般'
                        }else if (stockPercent > 0.7)
                        {
                            stockLevel = '机构关注度较低'
                        }
                    }
                    if(data.ratingTotal == 0){
                        stockLevel = '该股暂无机构关注'
                    }
                    var organRating="近半年有"+resObj.organRating.ratingResult.ratingTotal+"篇研报，"+stockLevel+'。';
                }else{
                    var organRating='';
                }

                text+=organRating;
                resObj.abstract=text;

                    // 页面渲染
                    var str = jade.renderFile('./views/layout.jade', resObj );
                    fs.writeFile( './html/' + stockCode + '.html', str, function( err ){
                        if( err ) {
                            logger.log( err );
                        }
                        times++;
                        if(times<=stockResData.length-1){
                            startRender(times);
                        }

                        logger.log( 'success：'+ stockCode);
                    } );

            }
            logger.log('end2...')
        });
    });
    req.on('error', function(e) {
        logger.log('problem with request: ' + e.message);
    });
    req.write(content);
    req.end();

}

function startRender(times) {
    time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
    if(times==0){
        var queryData = querystring.stringify({
            type: 1,
            status: 1,
            cache: true
        })
        logger.log(time+' start1...')
        var opt = {
            hostname:'semantic-composite-service',
            port :31001,
            path:'/stock?'+queryData,
            method: 'get',
            headers: {
                'Content-Type':'application/json',
                'Content-Length': queryData.length
            }
        };
        var req = http.request(opt, function (res) {
            logger.log(time+' STATUS1: ' + res.statusCode);
            var buffers = [];

            res.on('data', function(chunk) {
                buffers.push(chunk);
            });

            res.on('end', function(chunk) {
                var wholeData = Buffer.concat(buffers);
                var dataStr = wholeData.toString('utf8');
                var data = ''+wholeData
                var result = JSON.parse(data)
                if(result.message.code == 0){
                    stockResData = result.data
                    // crawler('sz', '000002')
                    // crawler('sz', '000040')
                    // crawler('sh', '603516')
                    // crawler('sh', '603596')
                    crawler('sz', '300712')
                    // crawler(stockResData[times].market, stockResData[times].code)
                }

                logger.log(time+' end1...')
            });
        });
        req.on('error', function(e) {
            logger.log(time+' problem with request: ' + e.message);
        });
        req.write(queryData);
        req.end();
    }else{
        // crawler(stockResData[times].market, stockResData[times].code)
    }
}
startRender(times);


