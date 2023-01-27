const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// 代理后端
let proxyObj = {}
proxyObj['/']={
  ws:false,
  target:'http://localhost:1225/vhr',
  changeOrigin:true,
  pathRewrite:{
    '^/':''
  }
}
// 定义这台服务本身的信息
module.exports={
  devServer:{
    host:'localhost',
    port:1227,
    proxy:proxyObj
  }
}
