Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    information:[],
    userSex:'',
    modalHidden:true,
    index: 0
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  getname:function(){
    getApp().globalData.userInfo.nickname;
  },
  //单选按钮发生变化
  radioChange(e){
    console.log(e.detail.value);
    var sexName=this.data.isSex
    this.setData({
      isSex:e.detail.value
    })
  },
 
  //表单提交
  formSubmit(e){
    this.setData({
      modalHidden:false
    });
  },
  
  formInputChange:function(e){
    let {field} = e.currentTarget.dataset
    this.setData({
      [`${field}`]:e.detail.value
    })
  },
 
  //模态框取消
  modalCancel(){
    wx.showToast({
      title: '取消提交',
      icon:'none'
    })
    this.setData({
      modalHidden:true,
    })
  },
  //模态框确定
  modalConfirm() {
    wx.showLoading({
      title: '正在提交',
    })
    let that = this
    getApp().request({
      url:'/user',
      method:'PUT',
      data:{
        name:that.data.name,
        phoneNumber:that.data.phone,
        identityId:that.data.identityId
      },
      success:(res)=>{
        if(res.statusCode ==200){
          wx.showToast({
            title: '提交成功'
          })
          getApp().getUserInfo(function(){})
          setTimeout(() => {
            wx.navigateBack({
              complete: (res) => {},
            })
          }, 1500);
        }
      },
      fail:(err)=>{
        console.log(err)
        wx.showToast({
          title: '操作失败',
          icon:'none'
        })
      }
    })

    this.setData({
      modalHidden: true
    })
  },
  onLoad: function (options) {
  
  },
  onShow:function(){
    this.setData({
      name: getApp().globalData.userInfo.name || '',
      phone:getApp().globalData.userInfo.phoneNumber || '',
      identityId: getApp().globalData.userInfo.identityId || ''
    })
  }
})
