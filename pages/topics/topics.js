// pages/topics/topics.js
import cnode from '../../utils/api';

Page({

  /**
   * 页面的初始数据
   */
  data: {
     title:'话题列表',
     topicsList:[],
     hidden:'false',
     page:1,
     tab:'all',
     topBarItems:[
       //id name 选中状态
      {id:'all',name:'全部',selected:true},
      {id:'good',name:'精华',selected:false},
      {id:'share',name:'分享',selected:false},
      {id:'ask',name:'问答',selected:false},
      {id:'job',name:'招聘',selected:false}

     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    cnode.cnode('all', 20, 1, true, that);
  },
  //tab栏标签点击
  onTabItemTap: function(e){
    var self =this;
    var tab= e.currentTarget.id;
    self.setData({
      currentTag:tab
    });
    if(tab!=='all') {
      self.fetchDate({tab:tab});
    } else {
      self.fetchDate();
    }
  },
  fetchDate:function(){
  
    wx.request({
      url: `https://cnodejs.org/api/v1/topics?tab=${tab}`,
        success:function(res){
            console.log(res);
            that.setData({
                hidden:true,
                topicList:res.data.data
            });
        }
    })
},
  //页面间跳转
  redictDetail: function (e) {
    console.log('我要看详情');
    var id = e.currentTarget.id,
        url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
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
    this.fetchData();
    console.log('下拉刷新',new Date());

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.length>0) {
      this.fetchData('上拉加载更多...')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})