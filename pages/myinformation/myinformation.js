Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    
    information:[],
    modalHidden:true,
    avatarUrl:'',
    schoolIndex:0,
    schoolList:[]
  },
  onShow:function(){
    console.info("进入onShow...")
    wx.showLoading({
      title: '正在获取',
    })

    let that = this
    getApp().request({
      url: '/schools',
      success:(res)=>{
        if(res.statusCode == 200){
          that.setData({
            schoolList:res.data
          })        
          console.info("获取学校列表成功,列表长度",that.data.schoolList.length,"code:",res.statusCode)
          that.findSchoolIndex()
        }
      },
      fail:(err)=>{
        console.info("获取学校列表失败...",err)
      },
      complete:()=>{
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
   
    this.setData({
      nickname:getApp().globalData.userInfo.nickname || null,
      phone:getApp().globalData.userInfo.phoneNumber || null
    });

  },
  findSchoolIndex:function(){
    let schoolId = getApp().globalData.userInfo.schoolId;
    if(schoolId){
      console.log('学校id:',schoolId)
    }
    let array = this.data.schoolList
    let i=0,len=array.length
    for(; i< len;i++){
      if(array[i].id == schoolId){
        console.log('找到对应学校...',array[i].id,array[i].name)
        this.setData({
          schoolIndex:i
        })
        return
      }
    }
    if(i == len ){
      console.log('没找到对应学校...')
    }
    
  },
  bindinput:function(e){
    let {name} = e.currentTarget.dataset
    this.setData({
      [`${name}`]:e.detail.value
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      schoolIndex: e.detail.value
    })
  },
  //表单提交
  formSubmit(e){
    console.log(e);
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
      modalHidden:true
    })
  },
  //模态框确定
  modalConfirm() {
    
    let that = this
    wx.showLoading({
      title: '正在提交',
    })
    getApp().request({
      url: '/user',
      method:'PUT',
      data:{
        nickname:that.data.nickname,
        schoolId:that.data.schoolList[that.data.schoolIndex].id,
        phoneNumber:that.data.phone
      },
      success:(res)=>{
        if(res.statusCode == 200){
          wx.showToast({
            title: '提交成功'
          })
          //更新本地用户信息
          getApp().getUserInfo(function(){})
        }else{
          wx.showToast({
            title: '提交失败',
            icon:'none'
          })
        }
        setTimeout(() => {
          wx.navigateBack({
            complete: (res) => {},
          })
        }, 1500);
        
      }
    })
    this.setData({
      modalHidden: true
    })
  },
  onLoad: function (options) {
  
  }
})
