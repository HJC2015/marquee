// pages/index/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg1:"北京",
    msg2:"上海",
    msg3:"南京",
    msg4:"返回全部",
  },
  btn1: function () {
    const db = wx.cloud.database()
    var that = this
    db.collection('house').where({
      status: false,
      position:"北京"
    }).get({
      success: function (res) {
        var data = res.data
        console.log(data)
        var pages = getCurrentPages();
        pages[pages.length - 1].setData({
          array: data,
        })

      }
    })
    wx.navigateBack({
      delta: 1
    })
  },
  btn2: function () {
    const db = wx.cloud.database()
    var that = this
    db.collection('house').where({
      status: false,
      position: "上海"
    }).get({
      success: function (res) {
        var data = res.data
        console.log(data)
        var pages = getCurrentPages();
        pages[pages.length - 1].setData({
          array: data,
        })

      }
    })
    wx.navigateBack({
      delta: 1
    })
  },
  btn3:function(){
    const db = wx.cloud.database()
    const _ = db.command
    var that = this
    db.collection('house').where({
      status: false,
      position:_.in(["江苏南京","南京"])
    }).get({
      success:function(res){
        var data = res.data
        console.log(data)
        var pages = getCurrentPages();
        pages[pages.length-1].setData({
          array: data,
        })
        
      }
    })
    wx.navigateBack({
      delta:1
    })
  },
  btn4: function () {
    const db = wx.cloud.database()
    var that = this
    db.collection('house').where({
      status: false,
    }).get({
      success: function (res) {
        var data = res.data
        console.log(data)
        var pages = getCurrentPages();
        pages[pages.length - 1].setData({
          array: data,
        })

      }
    })
    wx.navigateBack({
      delta: 1
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