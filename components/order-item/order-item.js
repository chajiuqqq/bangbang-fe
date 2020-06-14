// components/order-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderId:{
      type:String
    },
    status:{
      type:Number
    },
    content:{
      type:String
    },
    createTime:{
      type:String
    },
    amount:{
      type:Number
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    statusText:'',
    buttonText:'here'
  },
  //buttonText无法正常渲染
  attached:function(){
    this.update()
    this.setData({
      showButtonFlag:getApp().globalData.currentMyOrderIndex
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  update:function(status){
    let text=''
    let mybuttonText= ''
    switch(status || this.properties.status){
      case 0:
        text = '正在进行';
        mybuttonText = '确认收货';
        break;
      case 1:
        text = '已完成';
        break;
      case 2:
        text = '已取消';
        break;
      case 3:
        text = '待接单';
        mybuttonText = '取消';
        break;
    }
    this.setData({
      statusText: text,
      buttonText: mybuttonText
    })
    },
    onTap:function(e){
      let that = this
      wx.showModal({
        title:'确定操作吗',
        success:(res)=>{
          if(res.confirm){
                wx.showLoading({
                  title: '正在提交'
                })
                let option;
                switch(this.properties.status){
                  case 3:
                    option = 2
                    break
                  case 0:
                    option = 1
                    break
                  default:
          
                }
                getApp().request({
                  url:`/order/${this.properties.orderId}`,
                  method:'PUT',
                  data:{
                    option:option
                  },
                  success:(res)=>{
                      if(res.statusCode == 200){
                        wx.hideLoading({
                          complete: (res) => {},
                        })
                        wx.showToast({
                          title: '操作成功'
                        })
                        that.update(res.data.status)
                      }else{
                        wx.showToast({
                          title: '操作失败',
                          icon:'none'
                        })
                      }
                  },
                  fail:(err)=>{
                    wx.showToast({
                      title: '操作失败',
                      icon:'none'
                    })
                  }
                })
          }
        }
      })

      let myEventDetail={}
      let myEventOption={}
      this.triggerEvent('TapButton',myEventDetail,myEventOption)
    },
    turnto:function(){
      wx.navigateTo({
        url:`/pages/task/task?orderId=${this.properties.orderId}`
      })
    }

  }
})
