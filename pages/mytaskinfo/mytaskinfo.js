Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    let _this = this;
    // 从缓存中获取
    wx.getStorage({
      key: 'category_key',
      success: function (res) {
        // console.log(res)
        _this.setData({
          categoryTitle: res.data.title,
          categoryStatus: res.data.status,
          categoryCustomer_id: res.data.Customer_id,
          categoryCustomer_name: res.data.Customer_name,
          categoryCustomer_phone: res.data.Customer_phone,
          categoryHelper_id: res.data.Helper_id,
          categoryHelper_name: res.data.Helper_name,
          categoryHelper_phone: res.data.Helper_phone,
          categoryAmount: res.data.amount,
          categoryContent: res.data.Content,
          categoryTarget_address: res.data.Target_address,
          categoryPay_status: res.data.Pay_status,
          categoryReview_status: res.data.Review_status,
        })
      },
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