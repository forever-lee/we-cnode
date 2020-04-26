// pages/detail/detail.js
var Api =require('../../utils/api.js');
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
var HOST_URI ='https://cnodejs.org/api/v1';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'话题详情',
    detail:{},
    hidden:false,
    wxParseData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var topicid = options.id;
    var that =this;
    wx.request({
      url: `https://cnodejs.org/api/v1/topic/${topicid}`,
      success:function(res){
        console.log(res);
        that.setData({
          detail: res.data.data,
          wxParseData: WxParse('md',res.data.data.content)
        });
        setTimeout(function () {
          that.setData({
            hidden:true
          });
        },300);
    

      }
    })
     
  },
 
  collectTopic(id) {
    return new Promise((resolve,reject) =>{
       wx.request({
           url:`${HOST_URI}/topic_collect/collect`,
           data: {
               topic_id:id
           },
           method:'POST',
           dataType:'json',
           success:(result)=>{
               resolve(result)
           },
           fail:(err)=>{
               reject(err)
           }
       })
    })
},
deCollectTopic(id) {
    return new Promise((resolve,reject) =>{
        wx.request({
            url:`${HOST_URI}/topic_collect/de_collect`,
            data: {
                topic_id:id
            },
            method:'POST',
            dataType:'json',
            success:(result)=>{
                resolve(result)
            },
            fail:(err)=>{
                reject(err)
            }
        })
     })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var animation = wx.createAnimation({
      opacity:0.5,
    duration: 1000,
      timingFunction: 'ease',
  })

  this.animation = animation

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})