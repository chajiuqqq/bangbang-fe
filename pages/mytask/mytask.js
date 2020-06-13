Page({
  data:{
    selectedIndex:0,
    currentIndex:0,
    book:[
      {'text':'全部订单'},
      {'text':'未支付'},
      {'text':'待接单'},
      {'text':'正在进行'},
      {'text':'已完成'}
    ],
    take:[
      {'text':'全部订单'},
      {'text':'正在进行'},
      {'text':'已完成'}
    ],
    bookOrderList:[
    ],
    takedOrderList:[
    ]
  },
  onShow:function(){
    wx.showLoading({
      title: '正在加载',
    })
    let that = this
    getApp().request({
      url:'/orders',
      data:{
        identity:0
      },
      success:(res)=>{
        if(res.statusCode == 200){
          that.prepareData(res.data)
        }
      }
    })
  },

  prepareData:function(data){
    let all=[]
    let notPaied=[]
    let waitingForTake=[]
    let doing=[]
    let completed=[]

    for(let i=0,len=data.length;i<len;i++){
      all.push(data[i])

      if(data[i].payStatus == 0){
        notPaied.push(data[i])
      }
      if(data[i].status == 3){
        waitingForTake.push(data[i])
      }
      if(data[i].status == 0){
        doing.push(data[i])
      }
      if(data[i].status == 1){
        completed.push(data[i])
      }
    }
    
    this.data.bookOrderList = []  //先清空原来的数组，不然新的都到后面去了，格式错误无法显示...
    this.data.bookOrderList.push(all,notPaied,waitingForTake,doing,completed)
    this.setData({
      bookOrderList:this.data.bookOrderList
    })
    wx.hideLoading({
      complete: (res) => {},
    })

  },
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
  }
})