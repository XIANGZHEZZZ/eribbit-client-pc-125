// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展
// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'

// 使用 `require` 提供的函数 `context`  加载某一个目录下的所有 `.vue` 后缀的文件。
// 然后 `context` 函数会返回一个导入函数 `importFn`
// - 它又一个属性 `keys() `  获取所有的文件路径
// 通过文件路径数组，通过遍历数组，再使用 `importFn`  根据路径导入组件对象
// 遍历的同时进行全局注册即可

import Message from './Message'

// context(目录路径，是否加载子目录，加载文件的匹配正则)
const importFn = require.context('./', false, /\.vue$/)
export default {
  install (app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)
    // console.log(importFn.keys())
    importFn.keys().forEach(path => {
      // console.log(path)
      const component = importFn(path).default
      // console.log(component)
      app.component(component.name, component)
    })

    // 定义一个原型函数
    app.config.globalProperties.$message = Message
  }
}
