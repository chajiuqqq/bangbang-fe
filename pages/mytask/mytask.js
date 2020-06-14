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
    this.getOrderList(0)
    
  },
  getOrderList:function(identity){
    let that = this
    getApp().request({
      url:'/orders',
      data:{
        identity:identity || 0
      },
      success:(res)=>{
        if(res.statusCode == 200){
          wx.hideLoading({
            complete: (res) => {},
          })
          identity==0 ? that.prepareDataForBookList(res.data):that.prepareDataForTakedList(res.data)
        }
      }
    })
  },
  prepareDataForBookList:function(data){
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
  prepareDataForTakedList:function(data){
    let all=[]
    let doing=[]
    let completed=[]

    for(let i=0,len=data.length;i<len;i++){
      all.push(data[i])

      if(data[i].status == 0){
        doing.push(data[i])
      }
      if(data[i].status == 1){
        completed.push(data[i])
      }
    }
    
    this.data.takedOrderList = []  //先清空原来的数组，不然新的都到后面去了，格式错误无法显示...
    this.data.takedOrderList.push(all,doing,completed)
    this.setData({
      takedOrderList:this.data.takedOrderList
    })
    wx.hideLoading({
      complete: (res) => {},
    })

  },
  bindBarTap:function(e){
    wx.showLoading({
      title: '正在获取'
    })
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
    getApp().globalData.currentMyOrderIndex = this.data.currentIndex
    this.getOrderList(this.data.currentIndex)
  },
  bindSwiperChange:function(e){
    // 触摸更改时，更新left-tabbr选中
    if(e.detail.source == 'touch'){
      this.setData({
        currentIndex: e.detail.current
      })
    }
  },
  tapButton:function(){
    wx.showLoading({
      title: '正在获取'
    })
    this.getOrderList(this.data.currentIndex)
  }
})