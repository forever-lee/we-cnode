'use strict';

function cnode(tab='all', limit=40, page=1, mdrender=true, that,data) {
    if(!data) data = {};
    if(!data.page) data.page = 1;
    wx.request({
      url: `https://cnodejs.org/api/v1/topics?tab=${tab}&limit=${limit}&page=${page}&mdrender=${mdrender}`,
      header: {
        'Content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
         topicsList:res.data.data
          });
        setTimeout(function (){
          that.setData({
            hidden:true
          });
        },300);
        }
    })
  }
  
  module.exports = {
    cnode: cnode
  }