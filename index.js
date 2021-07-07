'use strict'
require('scripts/*')
// 全局声明依赖
const path = require('path')
const urlFor = require('hexo-util').url_for.bind(hexo)
const util = require('hexo-util')

hexo.extend.filter.register('after_generate', function (locals) {
  // 首先获取整体的配置项名称
  const config = hexo.config.tag_plugins || hexo.theme.config.tag_plugins
  // 如果配置开启
  if (!(config && config.enable)) return
  // 集体声明配置项
    const data = {
      issues: config.issues ? config.issues : false,
      animaCDN: config.CDN.anima ? urlFor(config.CDN.anima) : 'https://cdn.jsdelivr.net/gh/l-lin/font-awesome-animation/dist/font-awesome-animation.min.css',
      jqueryCDN: config.CDN.jquery ? urlFor(config.CDN.jquery) : 'https://cdn.jsdelivr.net/npm/jquery@latest/dist/jquery.min.js',
      issuesCDN: config.CDN.issues ? urlFor(config.CDN.issues) : 'https://cdn.jsdelivr.net/npm/hexo-theme-volantis@latest/source/js/issues.min.js',
      iconfontCDN: urlFor(config.CDN.iconfont)
    }

  //cdn资源声明
  //样式资源

  //样式资源
  const css_text = `<link rel="stylesheet" href="${data.animaCDN}" media="defer" onload="this.media='all'"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/hexo-butterfly-tag-plugins-plus/lib/tab_plugins.min.css" media="defer" onload="this.media='all'">`
  //脚本资源
  const js_text = `<script defer src="${data.jqueryCDN}"></script><script defer src="${data.animaCDN}"></script>`
  //iconfont symbol引入
  const iconfont_symbol = `<script async src="${data.iconfontCDN}"></script>`
  // 注入脚本资源
  hexo.extend.injector.register('head_end', css_text, "default");
  // 注入样式资源
  if (data.issues){
    hexo.extend.injector.register('body_end', js_text, "default");
  }
  if (data.iconfontCDN){
    hexo.extend.injector.register('body_end', iconfont_symbol, "default");
  }

},
hexo.extend.helper.register('priority', function(){
  // 过滤器优先级，priority 值越低，过滤器会越早执行，默认priority是10
  const pre_priority = hexo.config.tag_plugins.priority ?  hexo.config.tag_plugins.priority : hexo.theme.config.tag_plugins.priority
  const priority = pre_priority ? pre_priority : 10
  return priority
})
)
