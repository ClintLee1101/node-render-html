研报使用node+jade生成静态html

说明：
产品需求要求：股票数据每日大盘结束后获取的数据，生成PDF供用户查看股票的所有维度
缺点：后端Java生成难度大，还要使用canvas进行“截图”然后生成PDF，并且页面无交互功能。

采用方案
可以在每日生成大盘结束后动态生成html放置于服务器中，给出链接用户访问即可。并且由于是html页面可以进行点击等操作交互，查看图标数据

问题：
为什么不在用户点击查看按钮的时候，去请求数据然后渲染页面，这样就可以不在node端进行渲染了。这样做每当用户点击一次就跳转到html页面需要请求数据接口，成千上万个用户点击就访问上万次接口，在乘以股市3500只股票，给服务器带来压力可想而知，而如果node端渲染完生成好的html页面就很好的解决了这个问题。

技术方案：
node+jade模板生成html
node:http模块请求数据
jade模板对数据进行渲染    // 页面渲染var str = jade.renderFile('./views/layout.jade', resObj );
fs生成html文件  //fs.writeFile( './html/' + stockCode + '.html', str, function( err ){
                        if( err ) {
                            logger.log( err );
                        }
                        times++;
                        if(times<=stockResData.length-1){
                            startRender(times);
                        }

                        logger.log( 'success：'+ stockCode);
                    } );
fs模块写入日志 
              var stdout = fs.createWriteStream('./stdout.log', options);
              var stderr = fs.createWriteStream('./stderr.log', options);
              // 创建logger
               var logger = new console.Console(stdout, stderr);


接口/robot/semantic//semantic-api-service/api/qa?

get 

参数：
可传
sh 600155

获取以下维度数据
600155主营
600155行业概念

600155高管简介

600155股权激励

600155财务分析
600155股本结构

600155资金流向

600155估值评级

600155技术分析

600155风险信息



