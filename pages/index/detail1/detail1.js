// pages/index/detail1/detail1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail1: [],
    src: '../../../images/collect.png',
    src1: '../../../images/collect_onselected.png',
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
  ge: function () {
    var id = this.data.id
    var that = this
    const db = wx.cloud.database()
    this.data.flag = !this.data.flag
    var statusCollection = this.data.flag
    this.setData({
      flag: statusCollection
    })
    db.collection('house').doc(id).update({
      data: {
        statusCollection: statusCollection
      },
      success: function (res) {
      }
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
    var that = this
    var id = this.data.id
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