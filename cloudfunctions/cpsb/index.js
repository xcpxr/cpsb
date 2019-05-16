// 云函数入口文件
const cloud = require('wx-server-sdk')
const bot = require("baidu-aip-sdk").imageClassify;
cloud.init()
const APP_ID = "16256737";
const API_KEY = "ohbxHQ3OCilI9KY5kCt5DI0l";
const SECRET_KEY = "MhsN8tnDe8jCU1IVwsSbusPRbzkRsDov";
// 云函数入口函数
exports.main = async (event, context) =>{
  // 设置APPID/AK/SK
  var oops
  // 新建一个对象，建议只保存一个对象调用服务接口
  var client = new bot(APP_ID, API_KEY, SECRET_KEY);
  img=event.img64
  oops=await client.dishDetect(img)
  return oops.result
}