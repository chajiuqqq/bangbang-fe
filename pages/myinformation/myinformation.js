Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    
    information:[],
    modalHidden:true,
    array: ['上海交通大学', '复旦大学', '华东师范大学', '华东政法大学', '上海师范大学', '华东理工大学', '东华大学', '上海大学', '上海外国语大学', '同济大学', '华东政法大学','上海财经大学'],
    index: 0,
    avatarUrl:''
  },
  onshow:function(){
    this.setdata({
      avatarUrl:getApp().globalData.userInfo.avatarUrl
    });
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
 
  //表单提交
  formSubmit(e){
    console.log(e);
    var information= e.detail.value;
    this.setData({
      information: e.detail.value,
      modalHidden:false
    });
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
    wx.showToast({
      title: '提交成功',
      icon:'success'
    })
    this.setData({
      modalHidden: true
    })
  },
  onLoad: function (options) {
  
  }
})
