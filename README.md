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
    link:
      placeholder: /img/link.png #link_card标签默认的图标图片
    CDN:
      anima: https://unpkg.zhimg.com/hexo-butterfly-tag-plugins-plus@latest/lib/assets/font-awesome-animation.min.css #动画标签anima的依赖
      jquery: https://unpkg.zhimg.com/jquery@latest/dist/jquery.min.js #issues标签依赖
      issues: https://unpkg.zhimg.com/hexo-butterfly-tag-plugins-plus@latest/lib/assets/issues.js #issues标签依赖
      iconfont: //at.alicdn.com/t/font_2032782_8d5kxvn09md.js #参看https://akilar.top/posts/d2ebecef/
      carousel: https://unpkg.zhimg.com/hexo-butterfly-tag-plugins-plus@latest/lib/assets/carousel-touch.js
      tag_plugins_css: https://unpkg.zhimg.com/hexo-butterfly-tag-plugins-plus@latest/lib/tag_plugins.css
  ```
4. 参数释义

  |参数|备选值/类型|释义|
  |:--|:--|:--|
  |enable|true/false|【必选】控制开关|
  |priority|number|【可选】过滤器优先级，数值越小，执行越早，默认为10，选填|
  |issues|true/false|【可选】issues标签控制开关，默认为false|
  |link.placeholder|【必选】link卡片外挂标签的默认图标|
  |CDN.anima|URL|【可选】动画标签anima的依赖|
  |CDN.jquery|URL|【可选】issues标签依赖|
  |CDN.issues|URL|【可选】issues标签依赖|
  |CDN.iconfont|URL|【可选】iconfont标签symbol样式引入|
  |CDN.carousel|URL|【可选】carousel旋转相册标签鼠标拖动依赖|
  |CDN.tag_plugins_css|URL|【可选】外挂标签样式的CSS依赖|

# 外挂标签文档
[Tag Plugins Plus](https://akilar.top/posts/615e2dec/)
