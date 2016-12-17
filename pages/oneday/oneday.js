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
    utils.wxGetData(dataApi, {
      success: _this.getData,
      fail: _this.failData
    })


    _this.cdAnimation = wx.createAnimation()
    _this.headerAnimation = wx.createAnimation({
      transformOrigin: "0,0"
    })
    // 页面渲染完成
    _this.isCdRotate()
  },
  onShow: function () {
  },
  cdRotate: function (deg) {
    this.cdAnimation.rotate(deg).step()
    this.setData({ cdAnimation: this.cdAnimation.export() })
  },
  headerRotate: function(deg, translateX, y){
    this.headerAnimation.rotate(deg).translate(translateX, y).step({ duration: 300 })
    this.setData({ headerAnimation: this.headerAnimation.export() })
  },
  isCdRotate: function () {
    var _this = this
    var isPlay = _this.data.musicAction.actions.method
    if (isPlay == "play") {
      
      _this.headerRotate(30, -10. -5)
      _this.cdRotate(30)
      
    } else {
      
      _this.headerRotate(0, 10)
      _this.cdRotate(0)
    }
  },
  resetPageData: function () {
    var _this = this;
    // set loading
    _this.setData({
      category: "loading",
      like: false,
      musicAction: {
        actions: {
          method: "pause"
        }
      }
    })
  },
  refresh: function (e) {
    var _this = this;
    _this.resetPageData();
    utils.wxGetData(dataApi, {
      success: _this.getData,
      fail: _this.failData
    });
    _this.isCdRotate()
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
    var _res = res;
    if (res.data.status == "ok") {
      wx.getNetworkType({
        success: function(res) {
          var action = "pause";
          if(res.networkType == "wifi"){
            action = "play";
          }
          _this.setData({
            musicAction: {
              actions:{
                method: action
              }
            }
          })
          _this.setData({
            category: _res.data.type,
            detaildats: _res.data.result
          })
          _this.isCdRotate()    
        }
      })
      
    } else {
      _this.setData({
        category: "error",
        detaildats: {}
      })
    }
  },

  //like
  like: function () {
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
  shiftAudioStatus: function () {
    var playStatus = this.data.musicAction.actions.method,
      _status, _this = this;

    if (playStatus == "play") {
      _status = "pause"
    } else {
      _status = "play"
    }

    _this.setData({
      musicAction: {
        actions: {
          method: _status
        }
      }
    })
    _this.isCdRotate()
  }
})