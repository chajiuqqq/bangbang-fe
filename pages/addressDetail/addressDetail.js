// pages/addressDetail.js
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
    this.setData({
      addressee:options.addressee || '',
      address: options.address || '',
      phone: options.phone || '',
      id:options.id || '',
      edit:options.id ? true:false
    })
    console.log(this.data.edit)
  },
  formInputChange:function(e){
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  submitForm:function(){
    let that = this
    wx.showLoading({
      title: '正在提交',
    })
    getApp().request({
      url:`/address${that.data.edit?`/${that.data.id}`:''}`,
      method:that.data.edit?'PUT':'POST',
      data: that.data.formData,
      success:(res)=>{
          if(res.statusCode == 200){
            console.log('操作成功...')
            wx.showToast({
              title: '操作成功'
            })
            setTimeout(() => {
              wx.navigateBack({
                complete: (res) => {},
              })
            }, 1500);
          }else{
            wx.showToast({
              title: '操作失败',
              icon:'none'
            })
          }
      },
      fail:(err)=>{
        console.log("操作失败...",err)
        wx.showToast({
          title: '操作失败',
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

  del:function(){
    wx.showLoading({
      title: '正在删除',
    })
    let that = this
    getApp().request({
      url:`/address/${that.data.id}`,
      method:'DELETE',
      success:()=>{
        console.log('操作成功...')
        wx.hideLoading({
          complete: (res) => {},
        })
        wx.showToast({
          title: '操作成功'
        })
        setTimeout(() => {
          wx.navigateBack({
            complete: (res) => {},
          })
        }, 1500);
      },
      fail:(err)=>{
        console.log(err)
        wx.showToast({
          title: '操作失败',
          icon:'none'
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