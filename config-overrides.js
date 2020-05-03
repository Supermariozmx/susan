const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
  // 针对antd实现按需打包: 根据import来打包(使用babel-plugin-import)
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,  // 自动打包相关的样式[style:true是加载编译之前的源文件less]
  }),

  // 使用less-loader对源码中的less的变量进行重新指定
  addLessLoader({
    javascriptEnabled: true,
    //antd定制主题  可在antd文档中查看
    modifyVars: {'@primary-color': '#1DA57A'},
  }),
)