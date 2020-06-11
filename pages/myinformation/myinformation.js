Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    
    information:[],
    modalHidden:true
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
