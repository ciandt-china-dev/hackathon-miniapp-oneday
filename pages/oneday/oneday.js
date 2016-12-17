// pages/oneday/oneday.js
var utils = require('../../utils/util.js');
var dataApi = "https://oneday6xlttirwe6.devcloud.acquia-sites.com/oneday/ajax/getdata";
Page({
  data: {
    category: "loading",
    detaildats: {},
    musicAction: {
      actions: {
        method: "pause"
      }
    },
    like: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    var _this = this;
    // 页面渲染完成
    utils.wxGetData(dataApi, {
      success: _this.getData,
      fail: _this.failData
    })
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
  refresh: function (e) {
    var _this = this;
    // set loading
    _this.setData({
      category: "loading",
      like: false
    })
    utils.wxGetData(dataApi, {
      success: _this.getData,
      fail: _this.failData
    });
  },
  failData: function () {
    var _this = this;
    _this.setData({
      category: "error",
      detaildats: {}
    })
  },
  getData: function (res) {
    var _this = this;
    if (res.data.status == "ok") {
      _this.setData({
        category: res.data.type,
        detaildats: res.data.result
      })
    } else {
      _this.setData({
        category: "error",
        detaildats: {}
      })
    }
    console.log("api-data");
    console.log(res);
  },

  //like
  like: function(){
    this.setData({
        like: !this.data.like
      })
  },

  // audio
  audioPlayed: function () {
    console.log("audio paly");
  },
  audioPaused: function () {
    console.log("audio pause");
  },
  shiftAudioStatus: function(){
    var playStatus = this.data.musicAction.actions.method,
        _status, _this = this;

    if(playStatus == "play"){
      _status = "pause";
    }else{
      _status = "play";
    }
    _this.setData({
      musicAction: {
        actions:{
          method: _status
        }
      }
    })
  }
})