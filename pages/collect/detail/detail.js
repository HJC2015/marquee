// pages/collect/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
  },

  cancel:function(){
    var id = this.data.id
    var that = this
    const db = wx.cloud.database()
    db.collection('house').where({
      _id: id
    }).get({
      success: function (res) {
        that.setData({
          flag: res.data[0].statusCollection
        })
      }
    })
    this.data.flag = !this.data.flag
    var statusCollection = this.data.flag
    db.collection('house').doc(id).update({
      data: {
        statusCollection: statusCollection
      },
      success: function (res) {
      }
    })
  },
  cancel1: function () {
    var id = this.data.id
    var that = this
    const db = wx.cloud.database()
    db.collection('house').where({
      _id: id
    }).get({
      success: function (res) {
        that.setData({
          flag: res.data[0].statusCollection
        })
      }
    })
    this.data.flag = !this.data.flag
    var statusCollection = this.data.flag
    db.collection('house').doc(id).update({
      data: {
        statusCollection: statusCollection
      },
      success: function (res) {
        wx.navigateBack({
          
        })
      }
    })
  },
  chuzu: function () {
    var t = this.data.telephone
    wx.makePhoneCall({
      phoneNumber: t,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let item = JSON.parse(decodeURIComponent(options.str))
    var telephone = item.telephone
    var id = item._id
    that.setData({
      detail: item,
      telephone: telephone,
      id: id,
    })
    this.cancel()

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