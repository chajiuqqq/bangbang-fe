// pages/posttask/posttask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text1:"姓名：",
    text2:"联系电话：",
    text3:"收货地址：",
    text4:"取件地址：",
    text5:"请选择期望送达时间：",
    text6:"需求：",
    text7:"系统推荐酬金：",
    max: 100, //最多字数 (根据自己需求改变) 
    currentWordNumber:0,
    price:"15",
    text8:"修改酬金",
    text9:"提交并支付",
    // text10:"取消",
    array: ['立即配送', '8:00-9:00', '9:00-10:00', '10:00-11:00',
    '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'
    , '17:00-18:00', '18:00-19:00','19:00-20:00', '20:00-21:00', '21:00-22:00'],
    index: 0
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    console.log(len)

    this.setData({
      currentWordNumber: len //当前字数  
    });
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行

    console.log(this.data)
  },
  changeprice:function(e){
    // 获取输入框的内容
    // var value = e.detail.value;
    let price = e.currentTarget.dataset.price;
    this.setData({
      price:price
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