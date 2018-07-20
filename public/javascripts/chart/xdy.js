/**
 * Created by xdy on 2018/7/10.
 */

window.onload=function(){
    $('#symbol').hide();
    var symbol = $('#symbol').html();
    //loadScript("http://192.168.111.88:20022/js/charts/jKline_stock_analysis_9area.js?v=20180627",loadOk);//页面动态加载  js
    loadOk(symbol);
};

function loadOk(symbol) {
    shareholderChart.getShareholderAmountList();

    var t_chart = (new Date()).getTime();
    var target = kline_9area.getTarget(t_chart,'fromPDF');//原技术分析优化（9大区域）
    $('#tech').html(target);
    kline_9area.init(symbol, t_chart,'fromPDF');//原技术分析优化（9大区域）

}
//页面动态加载  js
function loadScript(url,callback){
    var script = document.createElement("script");
    script.type = "text/javascript";
    if(script.readyState){
        script.onreadystatechange = function(){
            if(script.readyState=="loaded"||script.readyState=="complete"){
                script.onreadystatechange = null;
                callback();
            }
        }
    }else{
        if(callback){
            script.onload = function(){
                callback();
            }
        }

    }
    script.src= url;
    document.getElementsByTagName("head")[0].appendChild(script);
}


