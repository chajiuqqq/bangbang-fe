// pages/posttask/posttask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    max: 100, //最多字数 (根据自己需求改变) 
    currentWordNumber:0,
    price:"15",
    array: ['立即配送', '8:00-9:00', '9:00-10:00', '10:00-11:00',
    '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'
    , '17:00-18:00', '18:00-19:00','19:00-20:00', '20:00-21:00', '21:00-22:00'],
    index: 0,
    address:'点击选择地址',
    amount:15
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
    this.setData({
      content:value,
      currentWordNumber: len //当前字数  
    });
    //最多字数限制
    if (len > this.data.max) return;


  },
  changeprice:function(e){
    let price = e.detail.value;
    this.data.amount = price
  },
  chooseAddress:function(){
    wx.navigateTo({
      url: '/pages/address/address?choose=true'
    })
  },
  targetInput:function(e){
    this.setData({
      target_address:e.detail.value
    })
  },
  submit:function(){
    let that = this
    wx.showModal({
      title:'确定提交吗',
      success:(res)=>{
          if(res.confirm){
            wx.showLoading({
              title: '正在提交',
            })
            getApp().request({
              url:'/order',
              method:'POST',
              data:{
                amount:that.data.amount,
                content:that.data.content,
                target_address:that.data.target_address,
                addressId:that.data.addressId,
                address:that.data.address,
                addressee:that.data.addressee,
                addresseePhone:that.data.phone,
                arrivalTime:that.data.array[that.data.index]
              },
              success:(res)=>{
                  if(res.statusCode == 200){
                    console.log('订单提交成功！')
                    wx.hideLoading({
                      complete: (res) => {},
                    })
                    wx.showToast({
                      title: '提交成功'
                    })
                    setTimeout(() => {
                      wx.navigateTo({
                        url: `/pages/task/task?orderId=${res.data.orderId}`
                      })
                    }, 1500);
                  }else{
                    wx.showToast({
                      title: '提交失败',
                      icon:'none'
                    })
                  }
              },
              fail:(err)=>{
                console.log(err)
                wx.showToast({
                  title: '提交失败',
                  icon:'none'
                })
              }
            })
          }
      }
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
    
    let selectedAddress = getApp().globalData.selectedAddress || {}
    if(selectedAddress) {
      this.setData({
        addressee:selectedAddress.addressee,
        address:selectedAddress.address,
        phone:selectedAddress.phone,
        addressId:selectedAddress.id
      })
    }

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