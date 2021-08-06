# hexo-butterfly-tag-plugins-plus

给`hexo-theme-butterfly`添加 [大量外挂标签](https://akilar.top/posts/615e2dec/)

# 安装

1. 安装插件,在博客根目录`[Blogroot]`下打开终端，运行以下指令：
  ```bash
  npm install hexo-butterfly-tag-plugins-plus --save
  ```
2. 考虑到hexo自带的markdown渲染插件`hexo-renderer-marked`与外挂标签语法的兼容性较差，建议您将其替换成[hexo-renderer-kramed](https://www.npmjs.com/package/hexo-renderer-kramed)
  ```bash
  npm uninstall hexo-renderer-marked --save
  npm install hexo-renderer-kramed --save
  ```

3. 添加配置信息，以下为写法示例
  在站点配置文件`_config.yml`或者主题配置文件`_config.butterfly.yml`中添加

  ```yaml
  # tag-plugins-plus
  # see https://akilar.top/posts/615e2dec/
  tag_plugins:
    enable: true # 开关
    priority: 5 #过滤器优先权
    issues: false #issues标签开关
    CDN:
      anima: https://cdn.jsdelivr.net/gh/l-lin/font-awesome-animation/dist/font-awesome-animation.min.css #动画标签anima的依赖
      jquery: https://cdn.jsdelivr.net/npm/jquery@latest/dist/jquery.min.js #issues标签依赖
      issues: https://cdn.jsdelivr.net/npm/hexo-theme-volantis@latest/source/js/issues.min.js #issues标签依赖
      iconfont: //at.alicdn.com/t/font_2032782_8d5kxvn09md.js #参看https://akilar.top/posts/d2ebecef/
      carousel: https://cdn.jsdelivr.net/npm/hexo-butterfly-tag-plugins-plus@latest/lib/carousel-touch.min.js
  ```
4. 参数释义

  |参数|备选值/类型|释义|
  |:--|:--|:--|
  |enable|true/false|【必选】控制开关|
  |priority|number|【可选】过滤器优先级，数值越小，执行越早，默认为10，选填|
  |issues|true/false|【可选】issues标签控制开关，默认为false|
  |CDN.anima|URL|【可选】动画标签anima的依赖|
  |CDN.jquery|URL|【可选】issues标签依赖|
  |CDN.issues|URL|【可选】issues标签依赖|
  |CDN.iconfont|URL|【可选】iconfont标签symbol样式引入|
  |CDN.carousel|URL|【可选】carousel旋转相册标签鼠标拖动依赖|

# 外挂标签文档
[Tag Plugins Plus](https://akilar.top/posts/615e2dec/)
