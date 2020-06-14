//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:[],
    first:true
  },
  onShow:function(){
    if(!this.data.first){
      wx.showLoading({
        title: '正在加载'
      })
      this.getOrderList()
      this.data.first=false
    }
  },
  getOrderList:function(){
    wx.showLoading({
      title: '正在加载'
    })
    let that = this
    getApp().request({
      url:'/availableOrders',
      success:(res)=>{
        that.data.first = false 
        if(res.statusCode == 200){
          this.setData({
            list:res.data
          })
          
        }else if(res.statusCode == 401){
          wx.showToast({
            title: '请先更新用户信息',
            icon:'none'
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/myinformation/myinformation'
            })
          },1500);
        }else{
          wx.showToast({
            title: '获取失败',
            icon:'none'
          })
        }
      },
      complete:()=>{     
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
  },
  gotodetail:function(e){
    let {orderId} = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/task/task?orderId=${orderId}&takeOrder=true`
    })
  },
  GetThisTask:function(e){
      wx.showToast({
        title: '正在研发中,敬请期待',
        icon:'none'
      })
  },
  bindViewTap: function() {
  
  },
  onLoad: function () {
    let that = this
    getApp().checkLogin(that.getOrderList)
  },
  getUserInfo: function(e) {
  
  }
})
