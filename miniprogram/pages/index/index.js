//index.js
const app = getApp()

Page({
  data: {
  },
  handleSelect(e) {
    // console.dir(e)
    chooseWay=['camera']
    if(e.type=='longpress' | 'longtap')
      chooseWay[1]='album'
    // console.log(chooseWay)
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: chooseWay,
      success: res => {
        this.setData({
          imgPath: res.tempFilePaths[0]
        })
        console.log("图片路径："+this.imgPath)
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',
          success: res => {
            wx.cloud.callFunction({
              name: "cpsb",
              data: {
                img64: res.data
              },
              success:res=>{
                console.dir(res.result)
                this.setData({
                  temp:res.result
                })
                console.log("临时变量"+this.temp)
              }
            })
          }
        })
      },
    })
  },
  oops() {
    temp=this.temp
    wx.showLoading({ title: '分析中...' })
    this.setData({
      result:temp
    })
    console.log("最终结果"+this.result)
    wx.hideLoading()
  }
})
