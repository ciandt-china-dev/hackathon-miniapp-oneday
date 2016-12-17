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
    musicData: {
      "songname": "长大以后的世界",
      "seconds": 232,
      "albummid": "002hDQTi1Zsn3w",
      "songid": 109106698,
      "singerid": 161301,
      "albumpic_big": "http:\/\/i.gtimg.cn\/music\/photo\/mid_album_300\/3\/w\/002hDQTi1Zsn3w.jpg",
      "albumpic_small": "http:\/\/i.gtimg.cn\/music\/photo\/mid_album_90\/3\/w\/002hDQTi1Zsn3w.jpg",
      "downUrl": "http:\/\/dl.stream.qqmusic.qq.com\/109106698.mp3?vkey=37004D388C6B2A0259A8BFDBF5DB4C4403E29217D5FAA6360EC177FB819E943D5F4035E96C7B7431A1A37067D30896121B7788FE4432986B&guid=2718671044",
      "url": "http:\/\/ws.stream.qqmusic.qq.com\/109106698.m4a?fromtag=46",
      "singername": "王源",
      "albumid": 1675984
    },
    bookdata: {
      name: "book1"
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    var _this = this;
    // 页面渲染完成
    // _this.setData({
    //   category: "music"
    // })
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
      category: "loading"
    })
    // _this.setData({
    //   category: "music"
    // })
    // get new data from service
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