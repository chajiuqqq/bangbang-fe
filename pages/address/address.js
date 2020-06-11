// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "addresses": [
      {
        "address": "四教310",
        "addressee": "蔡芳",
        "phone": "13311111111",
        "id": 123
      },
      {
        "address": "四教310",
        "addressee": "郝磊",
        "phone": "13311111111",
        "id": 124
      },
      {
        "address": "四教310",
        "addressee": "郝芳",
        "phone": "13311111111",
        "id": 125
      },
      {
        "address": "四教310",
        "addressee": "邓娜",
        "phone": "13311111111",
        "id": 126
      },
      {
        "address": "四教310",
        "addressee": "熊军",
        "phone": "13311111111",
        "id": 127
      },
      {
        "address": "四教310",
        "addressee": "顾刚",
        "phone": "13311111111",
        "id": 128
      },
      {
        "address": "四教310",
        "addressee": "万平",
        "phone": "13311111111",
        "id": 129
      },
      {
        "address": "四教310",
        "addressee": "戴超",
        "phone": "13311111111",
        "id": 130
      }
    ],
    text1:"编辑",
    text2:"添加新地址"
  },
  turnto:function(){
    wx.navigateTo({
      url: '/pages/addressDetail/addressDetail'
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