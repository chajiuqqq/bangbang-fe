Component({
  properties:{
    orderList:{
      type:Array,
      value:[]
    },
    leftItemList:{
      type:Array,
      value:[]
    }
  },
  data:{
    selectedIndex:0,
    currentIndex:0
  },
 methods:{
  bindBarTap:function(e){
    this.setData({
      selectedIndex: e.currentTarget.dataset.index,
      currentIndex: e.currentTarget.dataset.index
    })
  },
  bindSwiperChange:function(e){
    // 触摸更改时，更新left-tabbr选中
    if(e.detail.source == 'touch'){
      this.setData({
        selectedIndex: e.detail.current
      })
    }
  },
  tapButton:function(){
    let myEventDetail={}
    let myEventOption={}
    this.triggerEvent('TapButton',myEventDetail,myEventOption)
  }

 }
})