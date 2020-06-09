Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    touxiang: 'https://manager.diandianxc.com/diandianxc/mrtx.png',
    icon_r: 'https://manager.diandianxc.com/mine/enter.png',
    sex:[
      {name:'0',value:'男',checked:'true'},
      {name:'1',value:'女'}
    ],
    isSex:"0",
    information:[],
    userSex:'',
    modalHidden:true
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
    console.log(e);
    var userSex=this.data.isSex==0?'男':'女';
    var information= e.detail.value;
    console.log(userSex);
    this.setData({
      information: e.detail.value,
      userSex,
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
