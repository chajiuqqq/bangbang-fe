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
    let text=''
    let mybuttonText= ''
    switch(this.properties.status){
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
  /**
   * 组件的方法列表
   */
  methods: {
    onTap:function(){
      var myEventDetail={}
      var myEventOption={}
      this.triggerEvent('TapButton',myEventDetail,myEventOption)
    }

  }
})
