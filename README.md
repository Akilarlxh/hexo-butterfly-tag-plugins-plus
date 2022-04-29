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
  |CDN.iconfont|URL|【可选】iconfont标签symbol样式引入，如果不想引入，则设为false|
  |CDN.carousel|URL|【可选】carousel旋转相册标签鼠标拖动依赖，如果不想引入则设为false|
  |CDN.tag_plugins_css|URL|【可选】外挂标签样式的CSS依赖，为避免CDN缓存延迟，建议将@latest改为具体版本号|

# 外挂标签文档
[Tag Plugins Plus](https://akilar.top/posts/615e2dec/)

# update-log
- `2022-04-29：1.0.17`
  1. 在bubble气泡外挂标签基础上新增reference引用文献标签
  2. 修复了bubble气泡外挂标签层级过高遮挡提示框的bug
- `2022-04-28：1.0.16`
  1. 移除timeline外挂标签，请使用butterfly新版自带的timeline标签，效果更好。
  2. 修复tip标签自定义图标无效的bug
- `2022-04-07：1.0.15`
  1. 调整bubble气泡标签样式动画逻辑，避免透明度变化瞬间遮挡正文。
- `2022-04-07：1.0.14`
  1. 新增气泡注释bubble标签样式。效果比nota标签更好。
  2. 支持自定义气泡背景色。
- `2022-03-03：1.0.13`
  1. 新增开关逻辑，iconfont，carousel设为false则不引入。
  2. site标签新增灯箱屏蔽，不再支持点击放大图片。
- `2022-02-14：1.0.12`
  1. 剔除了link卡片的无效css属性。
- `2022-01-26：1.0.11`
  1. butterfly_v4.0新增了`timeline`标签，与本插件标签名冲突。可以选择改用标签文档中的源码配置方案或者删除主题原有的timeline标签文件`Blogroot\themes\butterfly\scripts\tag\timeline.js`和`Blogroot\themes\butterfly\source\css\_tags\timeline.styl`。
  2. 修复了carousel标签刷新后不加载的bug。
- `2021-12-23：1.0.10`
  1. 将所有CDN链接迁移至`unpkg.zhimg.com`。
  2. 外露所有CDN配置项，支持读者自行更改CDN源。
- `2021-12-09：1.0.9`
  1. 调整`link`标签的默认图片缺省值适配，新增`tag_plugins.link.placeholder`配置项。
  2. 因为新增了默认图片，新增配置项，所以需要更新版本。如果本身使用`link`标签就有自己加图片的习惯的，无需升级。
  3. 修复img-alt靠左的问题
- `2021-12-07：1.0.5`
  1. 调整 `folding `标签，解决与 twikoo 设置面板样式的冲突问题
  2. 因为调整了 `folding` 标签的编译函数，低版本会出现 `folding` 样式失效的情况，请各位更新至最新版本。
- `2021-12-01：1.0.4`
  1. 调整`tip`标签，字体垂直居中
- `2021-08-06：1.0.3`
  1. 新增`carousel`旋转相册标签
- `2021-07-07：1.0.0`
  1. 使用 npm 插件安装。
  2. 测试版本为 `butterfly_v3.1.0、3.3.0、3.7.8、3.8.0`
  3. 插件写法调整为高内聚，理论上不受 butterfly 主题版本影响。~~除非主题又整同名标签~~
  4. 为了获得完整效果，建议打开主题的`beautify`配置项和`theme_color`配置项。
