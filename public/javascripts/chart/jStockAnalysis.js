/**
 * Created by xdy on 18-07-12.
 * from:'',//来源  app(fromAPP)  .PDF研报(fromPDF)。智能小 E ('')
 * K线，日K
 * 支撑线。压力线,支撑位、压力位
 * 左肩  右肩(待定)
 * showTips  根据，k线数据来确定X/Y轴的label显示
 * 添加历史建议
 * kline.getTarget   @param from from == 'fromAPP'表示原生嵌套的个股分析页面
 * 智能小E 查询个股技术分析 from为空
 * macd指标信号
 */

var kline_9area = {
    sn:0,
    HttpUrl:'/robot/semantic/',
    //HttpUrl:'http://staging.robot.jinhui001.com/robot/semantic/',
    getTarget: function(sn,from) {
        kline_9area.sn = sn;

        if(from == 'fromAPP' || from == 'fromPDF'){
            kline_9area.HttpUrl = 'http://robot.rxhui.com/robot/semantic/';
        }else{
            kline_9area.HttpUrl = '/robot/semantic/';
        }
        var temp = '';
        if(from == 'fromPDF'){
            temp +='<div class="box_bg" id="title' + sn + '"></div>'+
                '<div class="chart">'+
                '<div id="report' + sn + '" class="note t_red"></div>'+
                '<div id="container' + sn + '" style="height: 220px;"></div>' +
                '</div>'+
                '<div id="explain' + sn + '"></div>'+
                '<h3>历史建议</h3>'+
                '<div class="box_time box_time_single" id="timeLine' + sn + '"></div>';
        }
        else if(from == 'fromAPP'){
            temp +=
                '<div class="box_stoInfo" id="title' + sn + '"></div>' +//标头
                '<div class="box_analysis2">'+
                '<div class="box_review">'+
                '<h5><b>综述：</b>长期看个股处于自17年2月10日大的上涨趋势里的回调阶段，中短期处于末端上涨阶段，需提防主力拉高出货。另外kdj指标死叉、macd死叉，后市需谨慎对待。</h5>'+
                '</div>'+
                '<div class="hd2">'+
                '<div>趋势分析<span>（每日晚9点更新信号）</span></div>'+
                '<a class="label">问小e</a>'+
                '</div>'+
                '</div>'+
                //'<div class="box_bRed box_bRed01" id="legend' + sn + '"><li>操作建议：由<b>【买入】</b>转为<b>【卖出】</b></li></div>' +
                //'<div id="report' + sn + '" class="box_stoDay t_red"></div>' +
                '<div class="box_chart01">' +//chart_box
                '<div class="box" style="position:relative; height:222px !important;">' +//box
                //'<div id="MACD' + sn + '" style=" width:100%; font-size:0.875em; height:1.333em; position:absolute; z-index:101; left:0; top:161px;"></div>' +
                '<div style="height:100%;">' +//div
                '<div id="container' + sn + '" class="box_chart01" style="height: 220px; position:absolute; z-index:100;"></div>' +
                '</div>' +//div
                '</div>' +//box
                '</div>' +//chart_box
                '<h5 id="explain' + sn + '"></h5>' +
                //'<div class="box_timeLine">' +//<!-- 时间轴 -->
                //'<a class="openList_xdy' + sn + '" onclick="kline_9area.openList(' + sn + ')">历史建议<i class="icon-arrow_shape_down"></i></a>' +
                //'<div class="timeLine" id="timeLine' + sn + '"></div>' +
                '</div>'+
                '<div class="box_analysis2">' +
                '<div class="hd2"><div>指标决策</div></div>'+
                '<div class="mb_tab chart_target">'+//MACD-----start
                '<nav>'+
                '<a class="on" id="macd_a' + sn + '" onclick="analysis_kline.macdShow(0,'+sn+')">macd</a>'+
                '<a id="kd_a' + sn + '" onclick="analysis_kline.macdShow(1,'+sn+')">kd</a>'+
                '<a id="rsi_a' + sn + '" onclick="analysis_kline.macdShow(2,'+sn+')">rsi</a>'+
                '</nav>'+
                '<div class="nav_con show" id="macd_nav_con' + sn + '">'+
                '<div class="chart">'+
                '<h6 id="macd_title' + sn + '"></h6>'+
                '<div id="container_macd' + sn + '" style="height: 150px;"></div>' +
                '</div>'+
                '<h5 style="display: none">macd买卖信号在小e中短期趋势体系下：<br>近3年成功率70.56%，年化收益率24.89%</h5>'+
                '</div>'+
                '<div class="nav_con" id="kd_nav_con' + sn + '">'+
                '<div class="chart">'+
                '<h6 id="kd_title' + sn + '"></h6>'+
                '<div id="container_kd' + sn + '" style="height: 150px;"></div>' +
                '</div>'+
                '<h5 style="display: none">kd买卖信号在小e中短期趋势体系下：<br>近3年成功率70.56%，年化收益率24.89%</h5>'+
                '</div>'+
                '<div class="nav_con" id="rsi_nav_con' + sn + '">'+
                '<div class="chart">'+
                '<h6 id="rsi_title' + sn + '"></h6>'+
                '<div id="container_rsi' + sn + '" style="height: 150px;"></div>' +
                '</div>'+
                '<h5 style="display: none">rsi买卖信号在小e中短期趋势体系下：<br>近3年成功率70.56%，年化收益率24.89%</h5>'+
                '</div>'+
                '</div>'+//MACD-----end
                '</div>';
        }
        else{
            temp +=
                '<div class="box_stoInfo" id="title' + sn + '"></div>' +//标头
                '<div class="box_analysis2">'+
                '<div class="box_review">'+
                '<h5><b>综述：</b>长期看个股处于自17年2月10日大的上涨趋势里的回调阶段，中短期处于末端上涨阶段，需提防主力拉高出货。另外kdj指标死叉、macd死叉，后市需谨慎对待。</h5>'+
                '</div>'+
                '<div class="hd2">'+
                '<div>趋势分析<span>（每日晚9点更新信号）</span></div>'+
                /*'<a class="label">问小e</a>'+*/
                /*'<a><i class="icon-add_help"></i>体系介绍</a>'+*/
                '</div>'+
                '</div>'+
                '<div class="box_bRed box_bRed01" id="legend' + sn + '"><li>操作建议：由<b>【买入】</b>转为<b>【卖出】</b></li></div>' +
                '<div id="report' + sn + '" class="box_stoDay t_red"></div>' +
                '<div class="box_chart01">' +//chart_box
                '<div class="box" style="position:relative; height:222px !important;">' +//box
                //'<div id="MACD' + sn + '" style=" width:100%; font-size:0.875em; height:1.333em; position:absolute; z-index:101; left:0; top:161px;"></div>' +
                '<div style="height:100%;">' +//div
                '<div id="container' + sn + '" class="box_chart01" style="height: 220px; position:absolute; z-index:100;"></div>' +
                '</div>' +//div
                '</div>' +//box
                '</div>' +//chart_box
                '<h5 id="explain' + sn + '"></h5>' +
                '<div class="box_timeLine">' +//<!-- 时间轴 -->
                '<a class="openList_xdy' + sn + '" onclick="kline_9area.openList(' + sn + ')">历史建议<i class="icon-arrow_shape_down"></i></a>' +
                '<div class="timeLine" id="timeLine' + sn + '"></div>' +
                '</div>'+
                '<div class="box_analysis2">' +
                '<div class="hd2"><div>指标决策</div></div>'+
                '<div class="mb_tab chart_target">'+//MACD-----start
                '<nav>'+
                '<a class="on" id="macd_a' + sn + '" onclick="analysis_kline.macdShow(0,'+sn+')">macd</a>'+
                '<a id="kd_a' + sn + '" onclick="analysis_kline.macdShow(1,'+sn+')">kd</a>'+
                '<a id="rsi_a' + sn + '" onclick="analysis_kline.macdShow(2,'+sn+')">rsi</a>'+
                '</nav>'+
                '<div class="nav_con show" id="macd_nav_con' + sn + '">'+
                '<div class="chart">'+
                '<div class="note" id="macd_title' + sn + '"></div>'+
                '<div id="container_macd' + sn + '" style="height: 150px;"></div>' +
                '<div class="chart_float" id="macd_chart_float' + sn + '" ></div>'+
                '</div>'+
                '<h5>指标说明：<br>'+
                '1. DIFF 与 DEA 均为正值,即都在零轴线以上时，大势属多头市场，DIFF 向上突破 DEA，可作买入信号<br>'+
                '2. DIFF 与 DEA 均为负值,即都在零轴线以下时，大势属空头市场，DIFF 向下跌破 DEA，可作卖出信号<br>'+
                '3. DEA 在盘整局面时失误率较高,但如果配合RSI 及KDj指标可适当弥补缺点'+
                '</h5>'+
                //'<h5 style="display: none">macd买卖信号在小e中短期趋势体系下：<br>近3年成功率70.56%，年化收益率24.89%</h5>'+
                '</div>'+
                '<div class="nav_con" id="kd_nav_con' + sn + '">'+
                '<div class="chart">'+
                '<div class="note" id="kd_title' + sn + '"></div>'+
                '<div id="container_kd' + sn + '" style="height: 150px;"></div>' +
                '<div class="chart_float" id="kd_chart_float' + sn + '" ></div>'+
                '</div>'+
                '<h5>指标说明：<br>'+
                '1. KD的取值范围都是0～100：80以上为超买区，20以下为超卖区，其余为徘徊区<br>'+
                '2. K上穿D是金叉，为买入信号，结合超卖区（20以下）的位置，越低可能性越大<br>'+
                '3. K下穿D是死叉，为卖出信号，结合超买区（20以下）的位置，越高可能性越大'+
                '</h5>'+
                //'<h5 style="display: none">kd买卖信号在小e中短期趋势体系下：<br>近3年成功率70.56%，年化收益率24.89%</h5>'+
                '</div>'+
                '<div class="nav_con" id="rsi_nav_con' + sn + '">'+
                '<div class="chart">'+
                '<div class="note" id="rsi_title' + sn + '"></div>'+
                '<div id="container_rsi' + sn + '" style="height: 150px;"></div>' +
                '<div class="chart_float" id="rsi_chart_float' + sn + '" ></div>'+
                '</div>'+
                '<h5>指标说明：<br>'+
                '1. 0≤RSI≤100,RSI=50为强势市场与弱势市场分界点。通常设RSI>80为超买区，市势回挡的机会增加；RSI<20为超卖区，市势反弹的机会增加<br>'+
                '2、短期RSI线在低位向上突破长期RSI线，买入信号<br>'+
                '3、短期RSI线在高位向下突破长期RSI线，卖出信号'+
                '</h5>'+
                //'<h5 style="display: none">rsi买卖信号在小e中短期趋势体系下：<br>近3年成功率70.56%，年化收益率24.89%</h5>'+
                '</div>'+
                '</div>'+//MACD-----end
                '</div>';
        }
        return temp;
    },

    init:function(symbol,sn,from) {
        kline_9area.emptyData();
        symbol = symbol==null ? 'sh600773' : symbol;//sh603903

        var str_qz = symbol.toString().substr(0,2);
        var str_symbol = symbol.toString().substr(2,6);

        if(str_symbol){
            //根据股票代码查新名称 K线数据
            kline_9area.getKLine(str_qz,str_symbol,sn,from);

            if(from != 'fromPDF'){
                //根据股票代码查指标macd kd rsi数据
                setTimeout(function () {
                    analysis_kline.initMACD(str_qz,str_symbol,sn)
                }, 500);
            }
        }
    },

    emptyData:function () {
        kline_9area.param.listStr = '';
        kline_9area.param.max = 0;
        kline_9area.param.min = 0;

        kline_9area.param.pressureData = [];
        kline_9area.param.supportData = [];

    },

    param: {

        listStr:'',//接口返回的数据字符串形式

        max:0,
        min :0,

        pressureData:[],//压力线
        supportData:[]//支撑线

    },

    /*
     * 这个方法用来控制K线上的flags的显示情况，当afterSetExtremes时触发该方法,通过flags显示当前时间区间最高价和最低价
     * minTime  当前k线图上最小的时间点
     * maxTime  当前k线图上最大的时间点
     * chart  当前的highstock对象
     */
    showTips:	function (ohlcArray,minTime,maxTime,chart,deaarray,difarray){
        chart.yAxis[0].removePlotLine('plot-line-max');
        chart.yAxis[0].removePlotLine('plot-line-min');
        //chart.yAxis[1].removePlotLine('macd-plot-line-0');
        //chart.showLoading();
        //定义当前时间区间中最低价的最小值，最高价的最大值 以及对应的时间
        var lowestPrice,highestPrice,array=[],highestArray=[],lowestArray=[],highestTime,lowestTime,flagsMaxData_1=[],flagsMaxData_2=[],flagsMinData_1,flagsMinData_2;

        for(var i=0;i<ohlcArray.length-1;i++){
            if(ohlcArray[i][0]>=minTime && ohlcArray[i][0]<=maxTime){
                array.push([
                    ohlcArray[i][0],
                    ohlcArray[i][2], //最高价
                    ohlcArray[i][3] //最低价
                ])
            }
        }

        if(!array.length>0){
            return;
        }
        highestArray = array.sort(function(x, y){  return y[1] - x[1];})[0];// 根据最高价降序排列
        highestTime =highestArray[0];
        highestPrice =highestArray[1].toFixed(2);

        lowestArray = array.sort(function(x, y){  return x[2] - y[2];})[0]; //根据最低价升序排列
        lowestTime =lowestArray[0];
        lowestPrice =lowestArray[2].toFixed(2);
        flagsMaxData_2 = [
            {
                x : highestTime,
                title : highestPrice
            }
        ];

        flagsMinData_2 = [
            {
                x : lowestTime,
                title : lowestPrice
            }
        ];
        var min =  parseFloat(flagsMinData_2[0].title) - parseFloat(flagsMinData_2[0].title)*0.05;
        var max =  parseFloat(flagsMaxData_2[0].title)+parseFloat(flagsMaxData_2[0].title)*0.05;
        var tickInterval = (( max-min)/3).toFixed(1)*1;
        //console.log(chart);

        //Y轴坐标自适应
        chart.yAxis[0].update({
            min : Number(lowestPrice),
            max : Number(highestPrice),
            //tickInterval: tickInterval
            tickPositioner:function(){
                var n0 = (lowestPrice-0.01).toFixed(2);
                var n1 = Number(Number(lowestPrice)+(highestPrice-lowestPrice)/4).toFixed(2);
                var n2 = Number(Number(lowestPrice)+2*(highestPrice-lowestPrice)/4).toFixed(2);
                var n3 = Number(Number(lowestPrice)+3*(highestPrice-lowestPrice)/4).toFixed(2);
                var n4 = Number(highestPrice).toFixed(2);
                var positions=[Number(n0),Number(n1),Number(n2),Number(n3),Number(n4)];
                //console.log(n0+"---------------=="+n1+"---==="+n2+"---==="+n3+"---==="+n4);
                return positions;
            }
        });

        //macd y轴零轴标示线
        /*chart.yAxis[1].addPlotLine({           //在y轴上增加标示线   y轴线
         value:0,
         width:0.5,
         color: '#9c9c9c',
         id: 'macd-plot-line-0'                  //标示线的id，在删除该标示线的时候需要该id标示
         });*/
        //K线 y轴零最大值
        chart.yAxis[0].addPlotLine({           //在x轴上增加标示线   x轴线
            value:Number(lowestPrice),
            width:1,
            color: '#ccd6eb',
            id: 'plot-line-max'                  //标示线的id，在删除该标示线的时候需要该id标示
        });
        //K线 y轴零最小值
        chart.yAxis[0].addPlotLine({           //在x轴上增加标示线   x轴线
            value:Number(highestPrice),
            width:1,
            color: '#ccd6eb',
            id: 'plot-line-min'                  //标示线的id，在删除该标示线的时候需要该id标示
        });

        chart.xAxis[0].update({
            tickPositioner:function(){
                var positions=[minTime,maxTime];
                return positions;
            }
        });
    },

    // 接口根据股票代码查新名称 K线数据
    getKLine: function (val,symbol,sn,from){
        jQuery.ajax(
            {
                url: kline_9area.HttpUrl+"/stock-analysis-service/trend/analysis/"+val+"/"+symbol,
                type: 'get',
                async: null,
                data: null,
                dataType: 'jsonp',
                success: function(rs)
                {
                    if(rs){
                        //有数据  用永奂技术分析的接口
                        //无数据 用丛丛 支撑压力的接口
                        if(rs.data.length>0){
                            kline_9area.param.listStr = JSON.stringify(rs.data[0]);

                            /**
                             * K线数据组
                             */
                            var stockList = rs.data[0].stockData;
                            var ohlc = [];//蜡烛图数据

                            if(stockList.length>0){
                                var len = stockList.length;

                                for(var j = 0;j<len;j++){
                                    ohlc.push([
                                        stockList[j].tradeAtLong,
                                        stockList[j].open,
                                        stockList[j].high,
                                        stockList[j].low,
                                        stockList[j].close,
                                        stockList[j].preClose
                                    ]);
                                }
                            }else{
                                alert("未返回K线数据");
                            }

                            //小时K  与  日K  添加最后一根K线
                            //日K判断日期是否一样
                            //小时K判断是否在15点之前
                            //最新价的open是0的时候不用添加到k线，open是0的是停牌或者没开市的时候

                            if(rs.data[0].dataType == 'DAY' || rs.data[0].dataType == 'HOUR'){

                                if(rs.data[0].dataType == 'DAY'){
                                    if(kline_9area.param.listStr.indexOf('newStockData') != -1){
                                        if(rs.data[0].newStockData.newPrice){
                                            if(rs.data[0].newStockData.newPrice !==0){
                                                if(new Date(ohlc[ohlc.length-1][0]).getDate()  != new Date(rs.data[0].newStockData.tradeAtLong).getDate()){
                                                    if(rs.data[0].newStockData.open !==0){
                                                        ohlc.push([
                                                            rs.data[0].newStockData.tradeAtLong,
                                                            rs.data[0].newStockData.open,
                                                            rs.data[0].newStockData.high,
                                                            rs.data[0].newStockData.low,
                                                            rs.data[0].newStockData.newPrice,
                                                            rs.data[0].newStockData.preClose
                                                        ]);
                                                    }
                                                }
                                            }
                                        }

                                    }
                                }
                                if(rs.data[0].dataType == 'HOUR'){
                                    if(kline_9area.param.listStr.indexOf('newStockData') != -1){
                                        if(rs.data[0].newStockData.newPrice){
                                            if(rs.data[0].newStockData.newPrice !==0){
                                                var d = new Date(rs.data[0].newStockData.tradeAtLong);
                                                var str = d.getHours()+":"+ d.getMinutes();
                                                if(timeUtil.time_range("09:30", "15:00", str)){
                                                    if(rs.data[0].newStockData.open !==0){
                                                        ohlc.push([
                                                            rs.data[0].newStockData.tradeAtLong,
                                                            rs.data[0].newStockData.open,
                                                            rs.data[0].newStockData.high,
                                                            rs.data[0].newStockData.low,
                                                            rs.data[0].newStockData.newPrice,
                                                            rs.data[0].newStockData.preClose
                                                        ]);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            var list = rs.data[0].quadrants;

                            /**
                             * 股票名称 代码
                             */
                            var newPrice = '--',
                                zd = '--',
                                zf = 0,
                                zfColor = '',
                                txt = '',reportTxt ='',
                                stockName = '--',
                                stockCode = '--',
                                tradeAt = '--';

                            if(kline_9area.param.listStr.indexOf('stockName') != -1){
                                stockName = rs.data[0].stockName;
                            }
                            if(kline_9area.param.listStr.indexOf('stockCode') != -1){
                                stockCode = rs.data[0].stockCode;
                            }

                            if(kline_9area.param.listStr.indexOf('newPrice') != -1){//昨收，
                                newPrice = rs.data[0].newStockData.newPrice;
                                newPrice = newPrice.toFixed(2);
                            }

                            if(kline_9area.param.listStr.indexOf('rise') != -1){//涨幅，
                                zf = rs.data[0].newStockData.rise;
                                zf = zf.toFixed(2);
                                if(zf > 0){
                                    zf = '+'+zf;
                                    zfColor = 't_red';
                                    $("#report"+sn).removeClass("t_red").removeClass("t_green").addClass("t_red");
                                }else if(zf < 0){
                                    zfColor = 't_green';
                                    $("#report"+sn).removeClass("t_red").removeClass("t_green").addClass("t_green");
                                }else{
                                    zfColor = '';
                                    $("#report"+sn).removeClass("t_red").removeClass("t_green");
                                }
                            }
                            if(kline_9area.param.listStr.indexOf('change') != -1){//涨跌，
                                zd = rs.data[0].newStockData.change;
                                zd = zd.toFixed(2);
                            }
                            if(kline_9area.param.listStr.indexOf('tradeAtLong') != -1){//返回时间

                                var date = new Date(parseInt(rs.data[0].newStockData.tradeAtLong, 10));
                                var year = date.getFullYear();
                                var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                                var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                                var hours = date.getHours() < 10 ? "0" +  date.getHours() :  date.getHours();
                                var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                                var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                                tradeAt = year+'-'+month+'-'+currentDate+' '+hours+':'+minutes+':'+seconds;
                            }

                            if(from == 'fromPDF'){
                                txt = '<div><h3>'+stockName+' ('+stockCode+')</h3><h5>'+tradeAt+'</h5></div><div class="'+zfColor+'"><h3>'+newPrice+'</h3><h5>'+zd+' ('+zf+'%)</h5></div>';
                                reportTxt = '<em>'+year+'-'+month+'-'+currentDate+'</em>开：<span>'+rs.data[0].newStockData.open+'</span>收：<span>'+newPrice+'</span>幅：<span>'+zf+'</span>';
                            }else{
                                txt = "<li><p>"+stockName+" ("+stockCode+") </p><h6>"+tradeAt+"</h6></li><li class='"+zfColor+"'><p>"+newPrice+"</p><h6>"+zd+"("+zf+"%)</h6></li>";
                                reportTxt = '<span>'+year+'-'+month+'-'+currentDate+'</span><span>开<em>'+rs.data[0].newStockData.open+'</em></span><span>收<em>'+newPrice+'</em></span><span>幅<em>'+zf+'</em></span>'
                            }
                            $('#title'+sn).html(txt);
                            $("#report"+sn).html(reportTxt);

                            /**
                             * 支撑线，压力线。
                             * 首先将取出的象限值进行排序，确定哪个象限值有数据
                             */
                            if(kline_9area.param.listStr.indexOf('Q_1') != -1){

                                /**
                                 * 红框白字一行
                                 * 支撑位大  压力位
                                 * 操作建议
                                 * 观望字符 不显示(0123-静静赵伟)
                                 */
                                var legend_txt = '',
                                    supportLevelLowPrice= '',//支撑位
                                    pressureLevelHighPrice = '';//压力位
                                //支撑位 支撑取最低，
                                if(kline_9area.param.listStr.indexOf('supportLevelLowPrice') !== -1 ){
                                    supportLevelLowPrice = list.Q_1.supportLevelLowPrice
                                }else{
                                    supportLevelLowPrice = '';
                                }

                                //压力位 压力位取最高
                                if(kline_9area.param.listStr.indexOf('pressureLevelHighPrice') !== -1 ){
                                    pressureLevelHighPrice = list.Q_1.pressureLevelHighPrice
                                }else{
                                    pressureLevelHighPrice = '';
                                }

                                //操作建议
                                var isPreEntrustBs = (rs.data[0].preEntrustBs==0||rs.data[0].preEntrustBs==1||rs.data[0].preEntrustBs==2) ? true : false;
                                var isEntrustBs = (rs.data[0].entrustBs==0||rs.data[0].entrustBs==1||rs.data[0].entrustBs==2) ? true : false;

                                if(isEntrustBs){
                                    if(0 == rs.data[0].entrustBs){
                                        legend_txt += '';
                                    }else{
                                        legend_txt += kline_9area.getTXT(rs.data[0].entrustBs)+'&nbsp;&nbsp;&nbsp;&nbsp;';
                                    }
                                }else{
                                    legend_txt += '';
                                }

                                /**
                                 * 支撑位大于现价 && 压力位小于现价 就不显示红色条
                                 */
                                if(pressureLevelHighPrice && pressureLevelHighPrice > newPrice){
                                    legend_txt += '压力位：'+pressureLevelHighPrice;
                                }
                                if(supportLevelLowPrice && supportLevelLowPrice < newPrice){
                                    legend_txt += '支撑位：'+supportLevelLowPrice;
                                }

                                if(legend_txt.length>0){
                                    $("#legend"+sn).show();
                                }else{
                                    $("#legend"+sn).hide();
                                }

                                $("#legend"+sn).html('<li>'+legend_txt+'</li>');


                                //压力线
                                var pressureStartAtLong= '',
                                    pressureStartPrice='',
                                    pressureEndAtLong='',
                                    pressureEndPrice='';
                                if(kline_9area.param.listStr.indexOf('pressureStartAtLong') !== -1 && kline_9area.param.listStr.indexOf('pressureStartPrice') !== -1 && kline_9area.param.listStr.indexOf('pressureEndAtLong') !== -1 && kline_9area.param.listStr.indexOf('pressureEndPrice') !== -1){
                                    if(list.Q_1.pressureStartAtLong && list.Q_1.pressureStartPrice && list.Q_1.pressureEndAtLong && list.Q_1.pressureEndPrice && list.Q_1.pressureStartAtLong != list.Q_1.pressureEndAtLong){
                                        kline_9area.param.pressureData.push(
                                            [list.Q_1.pressureStartAtLong,list.Q_1.pressureStartPrice],
                                            [list.Q_1.pressureEndAtLong,list.Q_1.pressureEndPrice]
                                        )
                                    }else{
                                        kline_9area.param.pressureData = [];
                                    }
                                }else{
                                    kline_9area.param.pressureData = [];
                                }

                                //支撑线
                                var supportStartAtLong ='',
                                    supportStartPrice = '',
                                    supportEndAtLong = '',
                                    supportEndPrice = '';
                                if(kline_9area.param.listStr.indexOf('supportStartAtLong') !== -1 && kline_9area.param.listStr.indexOf('supportStartPrice') !== -1 && kline_9area.param.listStr.indexOf('supportEndAtLong') !== -1 && kline_9area.param.listStr.indexOf('supportEndPrice') !== -1){
                                    if(list.Q_1.supportStartAtLong && list.Q_1.supportStartPrice && list.Q_1.supportEndAtLong && list.Q_1.supportEndPrice && list.Q_1.supportStartAtLong != list.Q_1.supportEndAtLong){
                                        kline_9area.param.supportData.push(
                                            [list.Q_1.supportStartAtLong,list.Q_1.supportStartPrice],
                                            [list.Q_1.supportEndAtLong,list.Q_1.supportEndPrice]
                                        )
                                    }else{
                                        kline_9area.param.supportData = [];
                                    }
                                }else{
                                    kline_9area.param.supportData = [];
                                }
                            }else{
                                kline_9area.param.pressureData = [];
                                kline_9area.param.supportData = [];
                            }

                            //话术
                            if(kline_9area.param.listStr.indexOf('analysisText') !== -1){
                                if(from == 'fromPDF'){
                                    $('#explain'+sn).html('<h3>技术面分析：</h3><p>'+rs.data[0].analysisText+'</p>');
                                }else{
                                    $('#explain'+sn).html('<b>技术面分析：</b>'+rs.data[0].analysisText);
                                }
                            }

                            //macd
                            if(kline_9area.param.listStr.indexOf('macdData') !== -1){
                                if(rs.data[0].macdData){
                                    var macdList = rs.data[0].macdData;
                                    var difData = [];//dif数据
                                    var deaData = [];//dea数据
                                    for(var k = 0;k<macdList.length;k++){
                                        difData.push([
                                            macdList[k].tradeAtLong,
                                            macdList[k].dif
                                        ]);
                                        deaData.push([
                                            macdList[k].tradeAtLong,
                                            macdList[k].dea
                                        ]);
                                    }
                                }


                            }else{
                                alert("未返回macd数据");
                            }

                            /**
                             * 历史建议  排序以后取前五条
                             */
                            if(kline_9area.param.listStr.indexOf('flowData') !== -1){
                                if(rs.data[0].flowData){
                                    var flowList = rs.data[0].flowData.sort(kline_9area.compare('entrustBsStartAt'));

                                    var txt = '',li_class='',li_tit='',pre_li_txt='',en_li_txt='',getLength = 0;

                                    if(flowList.length>5){
                                        getLength = 5;
                                    }else{
                                        getLength = flowList.length;
                                    }
                                    if(flowList.length == 0){//暂无历史建议

                                        if(from == 'fromPDF'){
                                            txt = '<dl><b></b><dt><b></b><i></i></dt><dd><div class="box_bg"><span>暂无历史建议</span></div></dd></dl>';
                                        }else{
                                            txt += '<ul><li class=' + li_class + '>' +
                                                '<dt><b></b><s><i></i></s></dt>' +
                                                '<dd><div class="space_between"><span>暂无历史建议</span></div></dd>' +
                                                '</li></ul>';
                                        }
                                    }else{
                                        if(from == 'fromPDF'){
                                            txt += '<ul>'
                                        }else{
                                            txt += ''
                                        }

                                        for(var k = 0;k<getLength;k++){
                                            var isPreEntrustBs = (flowList[k].preEntrustBs == 0 || flowList[k].preEntrustBs == 1 || flowList[k].preEntrustBs == 2) ? true : false;
                                            var isEntrustBs = (flowList[k].entrustBs == 0 ||flowList[k].entrustBs == 1 || flowList[k].entrustBs == 2) ? true : false;

                                            if(isPreEntrustBs && isEntrustBs){
                                                if(flowList[k].preEntrustBs == flowList[k].entrustBs){
                                                    li_tit = '发出'+kline_9area.getTXT(flowList[k].preEntrustBs)+'信号';
                                                }else{
                                                    li_tit = li_tit = '由'+kline_9area.getTXT(flowList[k].preEntrustBs)+'转为'+kline_9area.getTXT(flowList[k].entrustBs)+'信号';
                                                }
                                            }else if(isPreEntrustBs && !isEntrustBs){
                                                li_tit = '发出'+kline_9area.getTXT(flowList[k].preEntrustBs)+'信号';
                                            }else if(!isPreEntrustBs && isEntrustBs){
                                                li_tit = '发出'+kline_9area.getTXT(flowList[k].entrustBs)+'信号';
                                            }else{
                                                li_tit = '';
                                            }


                                            var date = new Date(parseInt(flowList[k].entrustBsStartAt, 10));
                                            var year = date.getFullYear();
                                            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                                            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

                                            if(from == 'fromPDF'){
                                                txt += '<dl><b></b><dt><b></b><i></i></dt><dd><div class="box_bg"><span>'+year+'-'+month+'-'+currentDate+'</span><span>'+li_tit+'</span></div></dd></dl>';
                                            }else{
                                                txt += '<li class='+li_class+'>'+
                                                    '<dt>'+
                                                    '<b></b>'+
                                                    '<s><i></i></s>'+
                                                    '</dt>'+
                                                    '<dd>'+
                                                    '<div class="space_between">'+
                                                    '<span>'+year+'-'+month+'-'+currentDate+li_tit+'</span>'+
                                                    /*'<span class="date">'+Highcharts.dateFormat("%Y/%m/%d",flowList[k].entrustBsStartAt)+'</span>'+*/
                                                    '</div>'+
                                                    /*'<h5>'+flowList[k].analysisText+'</h5>'+*/
                                                    '</dd>'+
                                                    '</li>';
                                            }
                                        }

                                    }
                                    if(from == 'fromPDF'){
                                        txt += '</ul>';
                                    }else{
                                        txt += ''
                                    }
                                    $('#timeLine'+sn).html(txt);
                                }
                            }else{
                                //alert("未返回历史建议");
                                var txt = '';
                                if(from == 'fromPDF'){
                                    txt = '<dl><b></b><dt><b></b><i></i></dt><dd><div class="box_bg"><span>暂无历史建议</span></div></dd></dl>';
                                }else{
                                    txt += '<ul>' +
                                        '<li>' +
                                        '<dt><b></b><s><i></i></s></dt>' +
                                        '<dd><div class="space_between"><span>暂无历史建议</span></div></dd>' +
                                        '</li>'+
                                        '</ul>';
                                }
                                $('#timeLine' + sn).html(txt);
                            }


                            //确定Y轴的最大值与最小值
                            kline_9area.param.max = ohlc[0][2];
                            kline_9area.param.min = ohlc[0][3];

                            for(var i =0;i<ohlc.length;i++){
                                if(kline_9area.param.max < ohlc[i][2]){//坐标最大值
                                    kline_9area.param.max = ohlc[i][2]
                                }
                                if(kline_9area.param.min > ohlc[i][3]){//坐标最小值
                                    kline_9area.param.min = ohlc[i][3]
                                }
                            }

                            /**
                             * 9大区域
                             */
                            var moduleData = [];
                            if(kline_9area.param.listStr.indexOf('moduleData') != -1){
                                moduleData = rs.data[0].directionData;
                            }
                            kline_9area.mapData(ohlc,difData,deaData,moduleData,sn,from);

                        }
                        else{
                            //查询股票代码、名称。现价。涨跌幅等
                            KLineServiceNoData.getStockName(val,symbol,sn);
                            //K线数据
                            KLineServiceNoData.getKLine(val,symbol,sn);

                        }
                    }
                },
                error: function()
                {
                    //console.log("error");
                }
            });
    },

    /**
     * 将K线数据映射成坐标系中的点
     * @param str
     * @returns {number}
     */
    mapData:function (ohlc,difData,deaData,moduleData,sn,from){
        var lastTime = ohlc[ohlc.length-1][0];//最后一天的时间值
        var _list=[];//将数据映射成坐标系中的点
        for(var j = 0;j<ohlc.length;j++){
            _list.push([
                j,
                ohlc[j][0]
            ]);
        }

        /**
         * 将切线数据装换成坐标系中的点
         * @type {Array}
         */

        /**
         * 两条切线方程
         * (b1-d1)x+(c1-a1)y = b1c1-a1d1     (max,pre)
         * (b2-d2)x+(c2-a2)y = b2c2-a2d2     (min,sup)
         * 一共有53条数据，最后一天映射坐标系中的点（52，y）
         * 当x=52时，求y
         *
         */
            //console.log(param.l1);


        var l1 = kline_9area.param.pressureData;
        var l2 = kline_9area.param.supportData;
        var data1 = [];
        var data2 = [];

        //压力线
        if(kline_9area.param.pressureData.length>0){
            for(var i = 0;i<l1.length;i++){
                for(var j = 0;j<_list.length;j++){
                    if(l1[i][0] == _list[j][1]){
                        var temp = [];
                        temp.push(_list[j][0],l1[i][1]);
                        data1.push(temp);
                    }
                }
            }
            var a_1 = Number(data1[0][0]),
                b_1 = Number(data1[0][1]),
                c_1 = Number(data1[1][0]),
                d_1 = Number(data1[1][1]),

                x1 = 0,
                y1 = 0;
            //交点公式
            /*x=[(b_1*c_1-a_1*d_1)*(c_2-a_2)-(c_1-a_1)*(b_2*c_2-a_2*d_2)]/[(b_1-d_1)*(c_2-a_2)-(c_1-a_1)*(b_2-d_2)];
             y=[(b_2*c_2-a_2*d_2)*(b_1-d_1)-(b_2-d_2)*(b_1*c_1-a_1*d_1)]/[(b_1-d_1)*(c_2-a_2)-(c_1-a_1)*(b_2-d_2)];*/

            //y1 = [(b_1*c_1-a_1*d_1)-52*(b_1-d_1)]/(c_1-a_1);
            x1 = [(b_1*c_1-a_1*d_1)-kline_9area.param.min*(c_1-a_1)]/(b_1-d_1);

            y1 = [(b_1*c_1-a_1*d_1)-parseInt(ohlc.length)*(b_1-d_1)]/(c_1-a_1);
            var temp = 0;
            for(var j = 0;j<ohlc.length;j++){
                if(Math.floor(x1) == _list[j][0]){
                    temp = _list[j][1]
                }
            }
            /**
             * 如果与z轴交点不在k线返回数据范围内，则与最后一根线相交
             */
            if(x1 < ohlc.length){
                kline_9area.param.pressureData.push([temp,kline_9area.param.min]);
            }else{
                kline_9area.param.pressureData.push([lastTime,Number(y1.toFixed(2))]);
            }

        }
        //支撑线
        if(kline_9area.param.supportData.length>0){
            for(var i = 0;i<l2.length;i++){
                for(var j = 0;j<_list.length;j++){
                    if(l2[i][0] == _list[j][1]){
                        var temp = [];
                        temp.push(_list[j][0],l2[i][1]);
                        data2.push(temp);
                    }
                }
            }

            var a_2 = Number(data2[0][0]),
                b_2 = Number(data2[0][1]),
                c_2 = Number(data2[1][0]),
                d_2 = Number(data2[1][1]),

                y2=0;
            //y2 = [(b_2*c_2-a_2*d_2)-52*(b_2-d_2)]/(c_2-a_2);

            y2 = [(b_2*c_2-a_2*d_2)-parseInt(ohlc.length)*(b_2-d_2)]/(c_2-a_2);

            kline_9area.param.supportData.push([lastTime,Number(y2.toFixed(2))]);
        }
        kline_9area.createChart (ohlc,difData,deaData,moduleData,sn,from);
    },

    // create the chart
    createChart:function (ohlc,difData,deaData,moduleData,sn,from){
        //var chartW = parseInt(window.parent.innerWidth)*0.88;
        var chartW = $('.box_stoInfo').width();
        var chartH = $("#container"+sn).height();

        var $reporting = $("#report"+sn);

        var $macd = $("#MACD"+sn);
        $macd.html('<span style="font-family: 微软雅黑;font-size: 0.825em;font-weight: normal;color: #000">MACD&nbsp;</span>'
            +'<span style="font-family: 微软雅黑;font-size: 0.825em;font-weight: normal;color: #d75d04">DIF:&nbsp;'+difData[difData.length-1][1].toFixed(2)+'</span>'
            +'<span style="font-family: 微软雅黑;font-size: 0.825em;font-weight: normal;color: #056ceb">DEA:'+deaData[deaData.length-1][1].toFixed(2)+'</span>'
        );

        //判断支撑线。压力线、左肩、右肩图例的显示隐藏
        var pressureDataLegend = false,
            supportDataLegend = false,
            leftDataLegend = false,
            rightDataLegend = false,
            legendName = '';

        if(kline_9area.param.pressureData.length>0){
            pressureDataLegend = true;
        }
        if(kline_9area.param.supportData.length>0){
            supportDataLegend = true;
        }


        //X轴显示的起始日期
        var startDate = ohlc[0][0];
        var lastDate = ohlc[ohlc.length-1][0];

        //macd y坐标的最大值与最小值
        var macdMax = difData[0][1];
        var macdMin = difData[0][1];
        var macdMaxData = [];
        if(difData.length>0){
            for(var i =0;i<difData.length;i++){
                if(macdMax < difData[i][1]){
                    macdMax = difData[i][1];
                }
                if(macdMin > difData[i][1]){
                    macdMin = difData[i][1];
                }
            }
        }
        if(deaData.length>0){
            for(var i =0;i<deaData.length;i++){
                if(macdMax < deaData[i][1]){
                    macdMax = deaData[i][1];
                }
                if(macdMin > deaData[i][1]){
                    macdMin = deaData[i][1];
                }
            }
        }
        //console.log("macdMax==="+macdMax);
        //判断开盘涨停的情况，以便于控制柱形图的颜色
        for(var i =0;i<ohlc.length;i++){
            var zf = parseFloat((parseFloat(ohlc[i][4])-parseFloat(ohlc[i][5]))/parseFloat(ohlc[i][5])*100);
            if(zf.toFixed(2) > 9.9){
                ohlc[i][4] =  parseFloat(ohlc[i][4])+0.01;
            }

        }
        for(var i =0;i<difData.length;i++){
            macdMaxData.push([difData[i][0],Number((macdMax+0.01).toFixed(2))]);
        }

        Highcharts.setOptions({
            lang:{
                contextButtonTitle:"图表导出菜单",
                decimalPoint:".",
                downloadJPEG:"下载JPEG图片",
                downloadPDF:"下载PDF文件",
                downloadPNG:"下载PNG文件",
                downloadSVG:"下载SVG文件",
                drillUpText:"返回 {series.name}",
                loading:"加载中",
                months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                noData:"没有数据",
                numericSymbols: [ "千" , "兆" , "G" , "T" , "P" , "E"],
                printChart:"打印图表",
                resetZoom:"恢复缩放",
                resetZoomTitle:"恢复图表",
                shortMonths: [ "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],
                thousandsSep:",",
                weekdays: ["星期一", "星期二", "星期三", "星期三", "星期四", "星期五", "星期六","星期天"]
            }
        });

        var c = new Highcharts.StockChart( {
            chart:{
                //关闭平移  ok
                panning:false,
                pinchType:'none',
                zoomType: 'x',
                renderTo : 'container'+sn,
                spacingTop: 5,
                spacingLeft: 3,
                spacingRight:0,
                width:chartW,
                events: {
                    load:function(){
                        kline_9area.showTips(ohlc,ohlc[0][0],ohlc[ohlc.length-1][0],this,deaData,difData);
                        //kline_9area.add9Area(this,moduleData,sn);
                    },
                    selection: function (event) {
                        if (event.xAxis) {
                            event.xAxis[0].axis.tickPositions =  [Number(startDate),Number(lastDate)];
                        }
                    }
                }
            },
            loading: {
                labelStyle: {
                    position: 'relative',
                    top: '10em',
                    zindex:1000
                }
            },
            credits:{//隐藏Highchart.com
                enabled:false
            },
            rangeSelector: {
                enabled:false,//隐藏日期选择器
                inputDateFormat: '%Y-%m-%d'  //设置右上角的日期格式

            },
            legend: {//图例
                enabled: true,
                align: 'center',
                verticalAlign: 'bottom',
                itemDistance: 10,
                symbolPadding: 3,
                symbolWidth:10,
                itemMarginTop: -8,
                itemMarginBottom: -8
            },
            yAxis: [
                {
                    title: {
                        enable:false
                    },
                    height: '100%',
                    lineWidth:1,//Y轴边缘线条粗细
                    gridLineColor: 'rgba(0,0,0,0)',
                    gridLineWidth:0.1,
                    opposite:false,
                    labels: {
                        align: 'left',
                        x: 0,
                        formatter: function () {

                            return this.value;
                        }
                    }
                }/*,{
                 title: {
                 enable:false
                 },
                 opposite:false,
                 top: '70%',
                 height: '30%',
                 gridLineColor: 'rgba(0,0,0,0)',
                 gridLineWidth:0.1,
                 lineWidth: 1,
                 labels: {
                 align: 'left',
                 x: 0,
                 formatter: function () {
                 return this.value;
                 }
                 },
                 tickPositioner:function(){
                 var positions=[Number((macdMin-0.01).toFixed(2)),Number((macdMax+0.01).toFixed(2))];
                 return positions;

                 }
                 }*/],
            xAxis: {//自定义X轴显示格式
                gridLineColor:'rgba(0,0,0,0)',
                type: 'datetime',
                labels: {
                    formatter: function() {
                        return Highcharts.dateFormat('%Y-%m-%d', this.value);
                    }
                },
                tickPositioner:function(){
                    var positions=[startDate,lastDate];
                    return positions;
                },
                events: {
                    afterSetExtremes: function(e) {
                        var minTime = Highcharts.dateFormat("%Y-%m-%d", e.min);
                        var maxTime = Highcharts.dateFormat("%Y-%m-%d", e.max);
                        var chart = this.chart;
                        kline_9area.showTips(ohlc,e.min,e.max,chart,deaData,difData);
                    }
                }
            },
            title: {
                align:'left',
                verticalAlign:'top',
                useHTML:true,
                text:"<span style='font-family: 微软雅黑;font-size: 0.625em;font-weight: normal'>日K 前复权</span>",
                floating:true
            },
            subtitle:{
                enable:false
            },
            exporting: {
                enabled: false  //设置导出按钮不可用
            },
            plotOptions: {
                //修改蜡烛颜色
                candlestick: {
                    color: '#33AA11',
                    upColor: '#DD2200',
                    lineColor: '#33AA11',
                    upLineColor: '#DD2200',
                    maker:{
                        states:{
                            hover:{
                                enabled:false
                            }
                        }
                    }
                },
                series: {
                    states: {//去掉曲线和蜡烛上的hover事件
                        hover: {
                            enabled: false
                        }
                    },
                    events: {
                        legendItemClick: function(e) {
                            return false; // 直接 return false 即可禁用图例点击事件
                        }
                    },
                    line: {
                        connectNulls: true
                    }
                }
            },

            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            tooltip: {
                enabled:true,
                backgroundColor: 'transparent',   // 背景颜色
                borderColor: 'transparent',         // 边框颜色
                borderRadius: 10,             // 边框圆角
                borderWidth: 3,               // 边框宽度
                shadow: false,                 // 是否显示阴影
                animation: false,               // 是否启用动画效果

                formatter:function(){
                    var open = 0;
                    var close = 0;

                    /**
                     * this.points
                     * 9大区域 返回的是object
                     * 其他返回的是array
                     */
                    var   gettype=Object.prototype.toString;//获取更精确的区分数据类型

                    if(gettype.call(this.points) == '[object Undefined]'){//9大区域
                        return;
                    }else{
                        if(this.points[0]){
                            if(this.points[0].point.open == undefined){
                                return;
                            }
                            open = this.points[0].point.open.toFixed(2);
                            close = this.points[0].point.close.toFixed(2);
                        }
                        var zdf = 0;//涨跌幅=（今收-昨收）/昨收
                        var date = new Date(parseInt(this.x, 10));
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                        var hours = date.getHours() < 10 ? "0" +  date.getHours() :  date.getHours();
                        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

                        var d = this.x;
                        //console.log(ohlc);
                        for(var i =0;i<ohlc.length;i++){
                            if(Highcharts.dateFormat('%Y-%m-%d',this.x) == Highcharts.dateFormat('%Y-%m-%d',ohlc[i][0])){
                                zdf = parseFloat((parseFloat(ohlc[i][4])-parseFloat(ohlc[i][5]))/parseFloat(ohlc[i][5])*100).toFixed(2);
                            }
                        }
                        var col = '#dd113c';
                        if(zdf>9.9){
                            close = parseFloat(parseFloat(close) - 0.01).toFixed(2);
                        }
                        if(zdf > 0){
                            zdf = '+'+zdf+'%';
                            col = '#dd113c';
                            $("#report"+sn).removeClass("t_red").removeClass("t_green").addClass("t_red");
                        }else if(zdf < 0){
                            zdf = zdf+'%';
                            col = '#319c11';
                            $("#report"+sn).removeClass("t_red").removeClass("t_green").addClass("t_green");
                        }else{
                            zdf = 0.00;
                            col = '#333';
                            $("#report"+sn).removeClass("t_red").removeClass("t_green");
                        }

                        if(from == 'fromPDF'){
                            $reporting.html('<em>'+year+'-'+month+'-'+currentDate+'</em>开：<span>'+open+'</span>收：<span>'+close+'</span>幅：<span>'+zdf+'</span>');
                        }else{
                            $reporting.html('<span>'+year + '-'+  month + '-' + currentDate+'</span><span>开<em>'+open+'</em></span><span>收<em>'+close+'</em></span><span>幅<em>'+zdf+'</em></span>');
                        }

                        var dif = 0;
                        var dea = 0;

                        if(this.points){
                            var len =this.points.length;
                            if(this.points.length < 2){
                                return;
                            }
                            if(this.points[len-2].y == undefined){
                                return;
                            }
                            if(this.points[len-1].y == undefined){
                                return;
                            }

                            dif = this.points[len-1].y.toFixed(2);
                            dea = this.points[len-2].y.toFixed(2);
                        }

                        $macd.html('<span style="font-family: 微软雅黑;font-size: 0.825em;font-weight: normal;color: #000">MACD&nbsp;</span>'
                            +'<span style="font-family: 微软雅黑;font-size: 0.825em;font-weight: normal;color: #d75d04">DIF:'+dif+'&nbsp;</span>'
                            +'<span style="font-family: 微软雅黑;font-size: 0.825em;font-weight: normal;color: #056ceb">DEA:'+dea+'</span>'
                        );
                    }


                }
            },
            series: [
                {
                    type: 'candlestick',
                    dataGrouping: {enabled: false},
                    name: 'K',
                    data: ohlc,
                    showInLegend: false // 设置为 false 即为不显示在图例中
                },{
                    type: 'line',
                    dataGrouping: {enabled: false},
                    name : '压力线',
                    data : kline_9area.param.pressureData,
                    color:'green',//绿色
                    lineWidth:1,
                    dashStyle:'ShortDash',
                    showInLegend: pressureDataLegend
                },{
                    type: 'line',
                    dataGrouping: {enabled: false},
                    name : '支撑线',
                    data : kline_9area.param.supportData,
                    color:'#dd113c',//红色
                    lineWidth:1,
                    showInLegend: supportDataLegend
                }/*,{
                 type: 'line',
                 name: 'macd封顶线',
                 dataGrouping: {enabled: false},
                 showInLegend: false,
                 data: macdMaxData,
                 color:'#606060',
                 lineWidth:0.5,
                 yAxis: 1
                 },{
                 type: 'line',
                 name: 'DEA',
                 dataGrouping: {enabled: false},
                 showInLegend: false,
                 color:'#056ceb',//黑色
                 data: deaData,
                 lineWidth:1,
                 yAxis: 1
                 },{
                 type: 'line',
                 name: 'DIF',
                 dataGrouping: {enabled: false},
                 showInLegend: false,
                 color:'#d75d04',//蓝色
                 data: difData,
                 lineWidth:1,
                 yAxis: 1
                 }*/]
        });

        chart = $('#container'+sn).highcharts();
        return c;
    },

    //9大区域 (暂时没用上)
    add9Area:function (chart,moduleData,sn){
        //var chart = $('#container'+sn).highcharts();
        var moduleDataList = moduleData;
        var buyData = [],sellData = [];//区块颜色说明
        var moduleUpData = [],moduleDownData = [];//向上区域,向下区域

        /**
         * 9大区域
         * 由于9大区域的数据条数不确定所以现加载
         * 3、区域和箭头优化，区域
         * （1）上涨，红色向上箭头，开始k最低价、结束k最高价、区域最高价
         * （2）下跌，绿色向下箭头，开始k最高价、结束k最低价、区域最低价     *
         * kline_9area.param.max Y轴最大值
         *  kline_9area.param.min Y轴最小值
         * */
        if(moduleDataList.length>0){
            for(var i = 0;i<moduleDataList.length;i++){
                var direction = moduleDataList[i].direction;
                if(direction=="UP"){
                    console.log("buy");
                    var temp0 = [];
                    temp0.push(moduleDataList[i].startAt+10000);
                    temp0.push(moduleDataList[i].startLow-0.2);
                    buyData.push(temp0);

                    moduleUpData = [];
                    var temp = [];
                    temp.push([moduleDataList[i].startAt,kline_9area.param.min,kline_9area.param.max]);
                    temp.push([moduleDataList[i].endAt,kline_9area.param.min,kline_9area.param.max]);
                    moduleUpData.push(temp);

                    var zf = 0;
                    if(moduleDataList[i].low != 0){
                        zf = Number((moduleDataList[i].high-moduleDataList[i].low)/moduleDataList[i].low*100).toFixed(1)+'%';
                    }else{
                        zf = '0.00';
                    }

                    chart.addSeries({
                        showInLegend: false,
                        dataGrouping: {enabled: false},
                        type: 'arearange',
                        color:'#f3bab9',
                        fillOpacity:0.5,
                        data:moduleUpData[0],
                        lineWidth: 0.1,
                        lineColor: '#f3bab9',
                        name: '多头',
                        enableMouseTracking: false,
                        marker: {enabled: false}
                    });
                }
                else if(direction=="DOWN"){
                    console.log("sell");
                    var temp0 = [];
                    temp0.push(moduleDataList[i].startAt+1000);
                    temp0.push(moduleDataList[i].startHigh+0.2);
                    sellData.push(temp0);


                    moduleDownData = [];
                    var temp = [];
                    temp.push([moduleDataList[i].startAt,kline_9area.param.min,kline_9area.param.max]);
                    temp.push([moduleDataList[i].endAt,kline_9area.param.min,kline_9area.param.max]);
                    moduleDownData.push(temp);

                    var zf = 0;
                    if(moduleDataList[i].low != 0){
                        zf = Number((moduleDataList[i].high-moduleDataList[i].low)/moduleDataList[i].low*100).toFixed(1)+'%';
                    }else{
                        zf = '0.00';
                    }

                    chart.addSeries({
                        showInLegend: false,
                        dataGrouping: {enabled: false},
                        type: 'arearange',
                        color:'#99acf9',
                        fillOpacity:0.5,
                        data:moduleDownData[0],
                        lineWidth: 0.1,
                        lineColor: '#99acf9',
                        enableMouseTracking: false,
                        name: '空头',
                        marker: {enabled: false}
                    });
                }
            }

            //在图例中显示
            var buyLegend = (buyData.length > 0 ? true : false);
            var sellLegend = (sellData.length > 0 ? true : false);

            chart.addSeries({
                showInLegend: buyLegend,
                dataGrouping: {enabled: false},
                type: 'scatter',
                name: '多头',
                data: buyData,
                marker: {symbol: 'url(images/duo.png)',width: 0.1,height: 10}
            });
            chart.addSeries({
                showInLegend: sellLegend,
                dataGrouping: {enabled: false},
                type: 'scatter',
                name: '空头',
                data: sellData,
                marker: {symbol: 'url(images/kong.png)',width: 0.1,height: 10}
            });
        }else{
            moduleUpData = [];
            moduleDownData = [];
            buyData = [];
            sellData = [];
        }
    },


    /**
     * 历史建议展开
     */
    openList:function (sn) {
        var a  = document.getElementsByClassName("openList_xdy"+sn);
        if( $(a).find("i").hasClass("icon-arrow_shape_down")){
            $(a).find("i").removeClass("icon-arrow_shape_down").addClass("icon-arrow_shape_up");
            $(a).next(".timeLine").slideDown();
        }else if( $(a).find("i").hasClass("icon-arrow_shape_up")){
            $(a).find("i").removeClass("icon-arrow_shape_up").addClass("icon-arrow_shape_down");
            $(a).next(".timeLine").slideUp();
        }
    },
    /**
     * 数组排序
     */
    compare:function (propertyName) {
        return function(object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            if (value2 < value1) {
                return -1;
            } else if (value2 > value1) {
                return 1;
            } else {
                return 0;
            }
        }
    },

    /**
     * 文字格式化
     */
    getTXT:function (val) {
        if(val == 1 ){
            return '买入';
        }else if(val == 2){
            return '卖出';
        }else if(val == 0){
            return '观望';
        }else{
            return '';
        }

    }

};
/**
 * 文字格式化
 */
function getTXT (val) {
    if(val == 1 ){
        return '买入';
    }else if(val == 2){
        return '卖出';
    }else if(val == 0){
        return '观望';
    }else{
        return '';
    }

}

