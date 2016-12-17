// pages/oneday/oneday.js
var utils = require('../../utils/util.js');
var cookApi = "https://oneday6xlttirwe6.devcloud.acquia-sites.com/oneday/ajax/getdata";
Page({
  data: {
    category: "cookbook",
    detaildats: {},
    bookdata:{
      name: "book1"
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    var _this = this;
    // 页面渲染完成
    utils.wxGetData(cookApi, {
       success: function(res){
         if(res.data.status == "ok"){
           _this.setData({
             category: res.data.type,
            detaildats: res.data.result
          })
         }
         console.log("api-data");
         console.log(res);
       }
     });
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  refresh: function(e){
    var _this = this;
    // get new data from service
     utils.wxGetData(cookApi, {
       success: function(res){
         if(res.data.status == "ok"){
           _this.setData({
             category: res.data.type,
            detaildats: res.data.result
          })
         }
         console.log("api-data");
         console.log(res);
       }
     });
  }
})