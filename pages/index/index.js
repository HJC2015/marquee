//index.js
const app = getApp()


Page({
  data: {
    imgUrls: [
      'cloud://hjc-4826d1.686a-hjc-4826d1-1258441258/240.176698976454.jpg',
      'cloud://hjc-4826d1.686a-hjc-4826d1-1258441258/968.0649937658962.jpg',
      'cloud://hjc-4826d1.686a-hjc-4826d1-1258441258/489.2161246205926.jpg'
    ],
    array:[],
  },
  city:function(){
    wx.navigateTo({
      url: 'search/search',
    })
  },
  navigatorToDetail:function(e){
    var that = this
    var item = e.currentTarget.dataset.item
    var str = JSON.stringify(item)
    wx.navigateTo({
      url: 'detail/detail?str='+encodeURIComponent(str),
    })
  },

  first:function(){
    const db = wx.cloud.database()
    db.collection('house').where({
      status: false
    }).get().then(res => {
      var data = res.data
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 1];
      prevPage.setData({
        array: data,
      })
    }) 
  },
  toImage:function(e){
    var src = ""
    var index = e.currentTarget.dataset.index
    var imgsrc = this.data.imgUrls[index]
    const db = wx.cloud.database()
    db.collection('house').where({
      imgSrc:imgsrc
    }).get({
      success:function(res){
        var item = res.data[0]
        var str = JSON.stringify(item)
        wx.navigateTo({
          url: 'detail1/detail1?str=' + encodeURIComponent(str),
        })
      }
    })
  },
  onLoad: function() {
    this.first()
  },
 onShow:function(){
    
 },
  

  // onReachBottom: function () {
  //   const db = wx.cloud.database()
  //   db.collection('house').where({
  //     status: false
  //   }).get().then(res => {
  //     var data = res.data
  //     var pages = getCurrentPages();
  //     var prevPage = pages[pages.length - 1];
  //     prevPage.setData({
  //       array: data,
  //     })
  //   }) 
  // },
})
