// pages/self/issue/issue.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src1:'',
    tempFilePaths:[],
    position:"",
    style:"",
    area:"",
    price:"",
    description:"",
    telephone:"",
    imgSrc:"",
  },
  positionInput: function (e) {
    this.setData({
      position: e.detail.value
    });//获取填入信息
  },
  styleInput: function (e) {
    this.setData({
      style: e.detail.value
    });//获取填入信息
  },
  areaInput: function (e) {
    this.setData({
      area: e.detail.value
    });//获取填入信息
  },
  priceInput: function (e) {
    this.setData({
      price: e.detail.value
    });//获取填入信息
  },
  descriptionInput: function (e) {
    this.setData({
      description: e.detail.value
    });
  },
  telephoneInput: function (e) {
    this.setData({
      telephone: e.detail.value
    });//获取填入信息
  },
  
  pic: function (options) {
      var that = this;
      wx.chooseImage({
        count: 9, // 默认9最多9张
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var filePath = res.tempFilePaths[0]
          // 上传图片
          // 这部分可以自行处理图片的命名方式，这里图片进行了固定命名为 my-image
          var name = Math.random()*1000
          var cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              var fid = res.fileID;
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 1];
              prevPage.setData({
                src1:filePath,
              })
             that.imgSrc= fid
             
            },
            
          })
        
        },
        fail: e => {
          console.error(e)
        }
      })
  },

  formSubmit: function () {
    var position = this.data.position;
    var area = this.data.area;
    var style = this.data.style;
    var price = this.data.price;
    var description = this.data.description;
    var telephone = this.data.telephone;
    var imgSrc = this.imgSrc;
    var telephonereg = /^1[345789]\d{9}$/;
    var p = /[a-z0-9]/;
     if (area == ""){
      wx.showToast({
        title: '面积不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }else if(position ==""){
        wx.showToast({
        title: '地址不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (!telephonereg.test(telephone)){
      wx.showToast({
        title: '请输入正确的电话',
        icon: 'none',
        duration: 2000,
        mask: true,
      })
    }else if(!p.test(price)){
      wx.showToast({
        title: '请输入正确价格',
        icon: 'none',
        duration: 2000,
        mask: true,
      })
    }
    else{
      wx.cloud.init({
        env: 'hjc-4826d1'
      })
      const db = wx.cloud.database()
      db.collection('house').add({
        data: {
          position: position,
          style: style,
          area: area,
          price: price,
          description: description,
          telephone: telephone,
          user: app.gobalData.nickName,
          imgSrc:imgSrc,
          status:false,
          statusCollection:false
        },
        success: function (res) {
          
          wx.showToast({
            title: '发布成功',
            icon: 'none',
            duration: 2000,
            mask: true,
          })
          
        }
      })
      wx.navigateBack({
        delat: 1
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.gobalData.nickName == "") {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000,
        success: function () {
          setTimeout(function () {
            wx.navigateBack({
              delat: 1
            });
          }, 1000)
        }
      })

    } 
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