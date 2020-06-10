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
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    statusText:''
  },
  attached:function(){
    let text=''
    switch(this.properties.status){
      case 0:
        text = '正在进行'
        break
      case 1:
        text = '已完成'
        break
      case 2:
        text = '已取消'
        break
      case 3:
        text = '待接单'
        break
    }
    this.setData({
      statusText: text
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
