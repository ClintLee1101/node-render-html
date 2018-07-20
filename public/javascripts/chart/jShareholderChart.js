/**
 * Created by xdy on 2018/7/10.
 * 股东人数变化图表
 * @param container 图表父容器id
 * @param list 数据列表
 *
 */
var shareholderChart = {
    getShareholderAmountList:function () {
        $.ajax({
            type: "get",
            url: "http://robot.rxhui.com/robot/semantic//semantic-api-service/api/qa",
            data: {
                question: "万科股东人数变化",
                userId: '',
                inputType:0,
                organization: '',
                fundAccount:''
            },
            dataType: "jsonp",
            timeout: 15000,
            jsonp: "callback",
            success: function (result) {
                var shareholderAmountList = result.data.shareholderAmountList;
                console.log(shareholderAmountList);
                shareholderChart.LineColumnChart("shareholderChart", shareholderAmountList.reverse());
            },
            error: function (event) {
                console.log('网络出问题了，请稍后再试');
            }
        });
    },

    LineColumnChart:function (container, list) {
        var holders = [],
            prices = [],
            dates = [];

        //提取数据
        list.forEach(function (item, index) {
            holders.push(item.shldAmount);
            prices.push(item.endPrice);
            dates.push(item.endDate);
        });

        Highcharts.chart(container, {
            chart: {
                zoomType: 'xy',
                width: $('.chart').width(),
                height: 300,
                spacingRight: -10,
                spacingLeft: -20,
                spacingBottom: -10
            },
            credits:{//隐藏Highchart.com
                enabled: false
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
                categories: dates,
                crosshair: true,
                labels: {
                    formatter: function() {
                        //console.log(this.value);
                        var d = this.value.toString();

                        var _y = Number(d.substr(0,4));
                        var _m = Number(d.substr(4,2))-1;
                        var _d = Number(d.substr(6,2));
                        var m = _m < 10 ? "0" + _m : _m;
                        var day = _d < 10 ? "0" + _d : _d;
                        return _y+'-'+m+'-'+day;
                    }
                }
            }],
            yAxis: [{ // 股价
                labels: {
                    // format: '{value}户',
                    style: {
                        color: '#639df5'
                    }
                },
                title: {
                    text: null,
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                offset: -20,
                opposite: true
            }, { // 股东
                title: {
                    text: null,
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    // format: '{value} 元',
                    style: {
                        color: '#e1c022'
                    }
                },
                offset: -20
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                x: 0,
                verticalAlign: 'bottom',
                y: 0
                // floating: true,
                // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            plotOptions:{
                series: {
                    events: {
                        legendItemClick: function(e) {
                            return false; // 直接 return false 即可禁用图例点击事件
                        }
                    }
                }

            },
            series: [{
                name: '股东',
                type: 'column',
                yAxis: 1,
                data: holders,
                color:  '#e1c022',
                tooltip: {
                    valueSuffix: ' 户'
                }

            }, {
                name: '股价',
                type: 'line',
                data: prices,
                color: '#639df5',
                tooltip: {
                    valueSuffix: ' 元'
                },
                marker: {
                    lineWidth: 2,
                    lineColor: '#639df5',
                    fillColor: 'white'
                }
            }]
        });
    }

};
