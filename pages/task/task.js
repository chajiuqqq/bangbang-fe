// pages/task/task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    request:''
  },
  GetThisTask:function(e){

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是不是从接单界面转过来的
    this.setData({
      takeOrder:options.takeOrder
    })

    var orderId= options.orderId;
    wx.showLoading({
      title: '正在加载',
    })
    getApp().request({
      url:`/order/${orderId}`,
      success:(res)=>{
        if(res.statusCode == 200){
          console.log('获取订单成功...')
          this.setData({
            currentOrder:res.data
          })
        }else{
          console.log('获取订单失败...')
          wx.showToast({
            title: '获取失败',
            icon:'none'
          })
        }
      },
      fail:(err)=>{
        console.log('获取订单失败...')
        wx.showToast({
          title: '获取失败',
          icon:'none'
        })
      },
      complete:()=>{
        wx.hideLoading({
          complete: (res) => {},
        })
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