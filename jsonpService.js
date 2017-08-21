(function(angular){
  'use strict';
  angular
    .module('a.jsonp',[])
    .service('jsonpService',['$window',function($window){
      //通过 $window 服务 获取全局对象
      var window = $window,
        document = window.document;
      //暴露jsonp方法
      this.jsonp = jsonp;
      function jsonp(url,params,callback){
        url+='?';
        for(var k in params){
          url+=k+'='+params[k]+'&';
        }
        var callbackName = 'jsonp_'+(new Date()-0)
        //拼接callback
        url+='callback=f'+callbackName;
        console.log(url);
        //全局函数接收ajax请求返回的数据
        window[callbackName]= function(data){
          callback(data);
          //拿到数据后--删除添加给 window 的属性
          delete window[callbackName];
          //拿到数据后--移除 script 标签
          document.head.removeChild(script);
        }

        //动态创建script标签
        var script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);
      }
    }])
})(angular)
