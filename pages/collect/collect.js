// pages/collect/collect.js
var app = getApp()


Page({

  data: {
    array: [],
    
  },
  navigatorToDetail: function (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    var str = JSON.stringify(item)
    wx.navigateTo({
      url: 'detail/detail?str=' + encodeURIComponent(str),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    if (app.gobalData.nickName == '') {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }else{
    const db = wx.cloud.database()
    db.collection('house').where({
      statusCollection: true
    }).get().then(res => {
      var data = res.data
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 1];
      prevPage.setData({
        array: data,
      })
    }) 
    }
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