// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "addresses": [],
    text1:"编辑",
    text2:"添加新地址"
  },
  turnto:function(){
    wx.navigateTo({
      url: '/pages/addressDetail/addressDetail'
    })
  },
  bindChoose:function(e){
    if(this.data.choose){
      getApp().globalData.selectedAddress = e.currentTarget.dataset.item
      wx.navigateBack({
        complete: (res) => {},
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      choose:options.choose
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
    wx.showLoading({
      title: '正在获取',
    })
    getApp().request({
      url:'/addresses',
      success:(res)=>{
        if(res.statusCode == 200){
          console.log("获取地址列表成功...",res.statusCode)
          this.setData({
            addresses : res.data
          })
        }else{
          console.log("获取地址列表失败...",res.statusCode)
        }
      },
      fail:(err)=>{
        console.log("获取地址列表失败...",err)
      },
      complete:()=>{
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
  },
  edit:function(e){
    let address = e.currentTarget.dataset.address
    wx.navigateTo({
      url: '/pages/addressDetail/addressDetail?addressee=' + address.addressee + '&address=' + address.address + '&phone=' + address.phone + '&id=' + address.id
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