'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

hexo.extend.filter.register('after_generate', function (locals) {
  // 首先获取整体的配置项名称
  const config = hexo.config.tag_plugins || hexo.theme.config.tag_plugins
  // 如果配置开启
  if (!(config && config.enable)) return
  // 集体声明配置项
    const data = {
      issues: config.issues ? config.issues : false,
      animaCDN: config.CDN.anima ? urlFor(config.CDN.anima) : 'https://unpkg.zhimg.com/hexo-butterfly-tag-plugins-plus@latest/lib/assets/font-awesome-animation.min.css',
      jqueryCDN: config.CDN.jquery ? urlFor(config.CDN.jquery) : 'https://unpkg.zhimg.com/jquery@latest/dist/jquery.min.js',
      issuesCDN: config.CDN.issues ? urlFor(config.CDN.issues) : 'https://unpkg.zhimg.com/hexo-butterfly-tag-plugins-plus@latest/lib/assets/issues.js',
      iconfontCDN: config.CDN.iconfont,
      carouselCDN: config.CDN.carousel,
      tag_plugins_css: config.CDN.tag_plugins_css ? urlFor(config.CDN.tag_plugins_css) : 'https://unpkg.zhimg.com/hexo-butterfly-tag-plugins-plus@latest/lib/tag_plugins.css'
    }

  //cdn资源声明
  //样式资源

  //head引入资源
  const css_text = `<link rel="stylesheet" href="${data.animaCDN}" media="defer" onload="this.media='all'"><link rel="stylesheet" href="${data.tag_plugins_css}" media="defer" onload="this.media='all'">`
  const carousel_cdn = `<script src="${data.carouselCDN}"></script>`
  //bottom引入资源
  const js_text = `<script defer src="${data.jqueryCDN}"></script><script defer src="${data.issuesCDN}"></script>`
  //iconfont symbol引入
  const iconfont_symbol = `<script async src="${data.iconfontCDN}"></script>`
  // 注入脚本资源
  hexo.extend.injector.register('head_end', css_text, "default");
  if (data.carouselCDN){
    hexo.extend.injector.register('head_end', carousel_cdn, "default");
  }

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
//btns.js

function postBtns(args, content) {
  return `<div class="btns ${args.join(' ')}">
            ${content}
          </div>`;
}

function postCell(args, content) {
  args = args.join(' ').split(',')
  let text = args[0] || ''
  let url = args[1] || ''
  text = text.trim()
  url = url.trim()
  if (url.length > 0) {
    url = "href='" + url + "'"
  }
  let icon = ''
  let img = 'https://unpkg.zhimg.com/hexo-butterfly-tag-plugins-plus@latest/lib/assets/default.svg'
  if (args.length > 2) {
    if (args[2].indexOf(' fa-') > -1) {
      icon = args[2].trim()
    } else {
      img = args[2].trim()
    }
  }
  if (icon.length > 0) {
    return `<a class="button" ${url} title='${text}'><i class='${icon}'></i>${text}</a>`
  } else {
    return `<a class="button" ${url} title='${text}'><img src='${img}'>${text}</a>`
  }
}
hexo.extend.tag.register('btns', postBtns, {ends: true});
hexo.extend.tag.register('cell', postCell);

//checkbos.js
function postCheckbox(args) {
  args = args.join(' ').split(',')
  var cls = ''
  var text = ''
  var checked = false
  if (args.length > 1) {
    cls = (args[0] || '').trim()
    if (cls.length > 0) {
      cls = ' ' + cls
    }
    if (cls.indexOf('checked') > -1) {
      checked = true
    }
    text = (args[1] || '').trim()
  } else if (args.length > 0) {
    text = (args[0] || '').trim()
  }
  if (text.length > 0) {
    return `<div class='checkbox${cls}'><input type="checkbox" ${ checked ? 'checked="checked"' : '' }/>
            ${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}
            </div>`
  }
}
function postRadio(args) {
  args = args.join(' ').split(',')
  var cls = ''
  var text = ''
  var checked = false
  if (args.length > 1) {
    cls = (args[0] || '').trim()
    if (cls.length > 0) {
      cls = ' ' + cls
    }
    if (cls.indexOf('checked') > -1) {
      checked = true
    }
    text = (args[1] || '').trim()
  } else if (args.length > 0) {
    text = (args[0] || '').trim()
  }
  if (text.length > 0) {
    return `<div class='checkbox${cls}'><input type="radio" ${ checked ? 'checked="checked"' : '' }/>
            ${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}
            </div>`
  }
}
// {% checkbox text %}
// {% checkbox checked, text %}
// {% checkbox color checked, text %}
hexo.extend.tag.register('checkbox', postCheckbox);
hexo.extend.tag.register('radio', postRadio);

//folding.js
function postFolding(args, content) {
  args = args.join(' ').split(',');
  let style = ''
  let title = ''
  if (args.length > 1) {
    style = args[0].trim()
    title = args[1].trim()
  } else if (args.length > 0) {
    title = args[0].trim()
  }
  if (style != undefined) {
    return `<details class="folding-tag" ${style}><summary> ${title} </summary>
              <div class='content'>
              ${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}
              </div>
            </details>`;
  } else {
    return `<details class="folding-tag"><summary> ${title} </summary>
              <div class='content'>
              ${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}
              </div>
            </details>`;
  }

}

hexo.extend.tag.register('folding', postFolding, {ends: true});

//ghbdage.js
/*{% bdage right,left,[logo]||[color],[link],[title]||option %}*/

function bdage (args) {

  args = args.join(' ').split('||')

  let base= args[0]?args[0].split(','):''
  let right = base[0]?encodeURI(base[0].trim()):''
  let left = base[1]?encodeURI(base[1].trim()):''
  let logo = base[2]?base[2].trim():''

  let message = args[1]?args[1].split(','):''
  let color = message[0]?message[0].trim():'orange'
  let link = message[1]?message[1].trim():''
  let title = message[2]?message[2].trim():''

  let option = args[2]?args[2].trim():''

  return `<object class="ghbdage" style="margin-inline:5px" title="${title}" standby="loading..." data="https://img.shields.io/badge/${left}-${right}-orange?logo=${logo}&color=${color}&link=${link}&${option}"></object>`
}
hexo.extend.tag.register('bdage',bdage);

//ghcard.js
/**
 * https://github.com/anuraghazra/github-readme-stats
 */

// {% ghcard volantis-x %}
// {% ghcard volantis-x/hexo-theme-volantis %}
hexo.extend.tag.register('ghcard', function(args) {
  args = args.join(' ').split(', ');
  let path = args[0].trim();
  let card = '';
  card += '<a class="ghcard" rel="external nofollow noopener noreferrer" href="https://github.com/' + path + '">';
  let url = '';
  if (path.includes('/')) {
    // is repo
    let ps = path.split('/');
    url += 'https://github-readme-stats.vercel.app/api/pin/?username=' + ps[0] + "&repo=" + ps[1];
  } else {
    // is user
    url += 'https://github-readme-stats.vercel.app/api/?username=' + path;
  }
  if (args.length > 1) {
    for (let i = 1; i < args.length; i++) {
      let tmp = args[i].trim();
      url += "&" + tmp;
    }
  }
  if (!url.includes('&show_owner=')) {
    url += '&show_owner=true';
  }
  card += '<img src="' + url + '"/>';
  card += '</a>';
  return card;
});

hexo.extend.tag.register('ghcardgroup', function(args, content) {
  let ret = '';
  // wrap
  ret += '<div class="ghcard-group">';
  ret += content;
  ret += '</div>';
  return ret;
}, {ends: true});

//iconfont.js
function iconFont(args) {
  args = args.join(' ').split(',')
  let p0 = args[0]
  let p1 = args[1]?args[1]:1
  return `<svg class="icon" style="width:${p1}em; height:${p1}em" aria-hidden="true"><use xlink:href="#${p0}"></use></svg>`;
}

hexo.extend.tag.register('icon',iconFont);

//image.js
'use strict';

// {% image url %}
// {% image url, alt=haha %}
// {% image url, width=50% %}
// {% image url, height=32px %}
// {% image url, bg=#eee %}
// {% image url, alt=haha, width=400px %}
// {% image url, alt=haha, width=400px, bg=#eee %}
hexo.extend.tag.register('image', function(args) {
  args = args.join(' ').split(', ');
  let url = args[0].trim();
  let alt = '';
  let bg = '';
  let style = '';
  if (args.length > 1) {
    for (let i = 1; i < args.length; i++) {
      let tmp = args[i].trim();
      if (tmp.includes('alt=')) {
        alt = tmp.substring(4, tmp.length);
      } else if (tmp.includes('width=')) {
        style += 'width:' + tmp.substring(6, tmp.length) + ';';
      } else if (tmp.includes('height=')) {
        style += 'height:' + tmp.substring(7, tmp.length) + ';';
      } else if (tmp.includes('bg=')) {
        bg = tmp.substring(3, tmp.length);
      }
    }
  }
  function img(url, alt, style) {
    let img = '';
    img += '<img class="img" src="' + url + '"';
    if (alt.length > 0) {
      img += ' alt="' + alt + '"';
    }
    if (style.length > 0) {
      img += ' style="' + style + '"';
    }
    img += '/>';
    return img;
  }

  let ret = '';
  // wrap
  ret += '<div class="img-wrap">';
  // bg
  ret += '<div class="img-bg"';
  if (bg.length > 0) {
    ret += ' style="background:' + bg + '"';
  }
  ret += '>';
  ret += img(url, alt, style);
  ret += '</div>';

  if (alt.length > 0) {
    ret += '<span class="image-caption">' + alt + '</span>';
  }

  ret += '</div>';
  return ret;
});


// {% inlineimage url %}
// {% inlineimage url, height=22px %}
hexo.extend.tag.register('inlineimage', function(args) {
  args = args.join(' ').split(', ');
  let url = args[0].trim();
  let ret = '';
  ret += '<img no-lazy class="inline" src="' + url + '"';
  let style = '';
  if (args.length > 1) {
    for (let i = 1; i < args.length; i++) {
      let tmp = args[i].trim();
      if (tmp.includes('height=')) {
        style += 'height:' + tmp.substring(7, tmp.length) + ';';
      }
    }
  }
  if (style.length > 0) {
    ret += ' style="' + style + '"';
  } else {
    ret += ' style="height:1.5em"';
  }
  ret += '/>';
  return ret;
});
//inline-labels.js
hexo.extend.tag.register('u', function(args) {
  return `<u>${args.join(' ')}</u>`;
});
hexo.extend.tag.register('emp', function(args) {
  return `<emp>${args.join(' ')}</emp>`;
});
hexo.extend.tag.register('wavy', function(args) {
  return `<wavy>${args.join(' ')}</wavy>`;
});
hexo.extend.tag.register('del', function(args) {
  return `<del>${args.join(' ')}</del>`;
});
hexo.extend.tag.register('kbd', function(args) {
  return `<kbd>${args.join(' ')}</kbd>`;
});
hexo.extend.tag.register('psw', function(args) {
  return `<psw>${args.join(' ')}</psw>`;
});
//issues.js
// 从 issues 加载动态数据
// {% issues sites/timeline/friends | api=xxx | group=key:a,b,c %}
// 例如：
// {% issues sites | api=https://api.github.com/repos/volantis-x/examples/issues?sort=updated&state=open&page=1&per_page=100 | group=version:latest,v6,v5,v4,v3,v2,v1,v0 %}
hexo.extend.tag.register('issues', function(args) {
  args = args.join(' ').split(' | ');
  // 所有支持的参数
  let type = args[0].trim();
  let api = '';
  let group = '';
  // 解析
  if (args.length > 1) {
    for (let i = 1; i < args.length; i++) {
      let tmp = args[i].trim();
      if (tmp.includes('type=')) {
        type = tmp.substring(5, tmp.length);
      } else if (tmp.includes('api=')) {
        api = tmp.substring(4, tmp.length);
      } else if (tmp.includes('group=')) {
        group = tmp.substring(6, tmp.length);
      }
    }
  }
  if (type.length == 0 || api.length == 0) {
    return;
  }
  // 布局
  let ret = '<div class="issues-api ' + type + '"';
  ret += 'api="' + api + '"';
  if (group.length > 0) {
    ret += 'group="' + group + '"';
  }
  ret += '></div>';
  return ret;
});


//link.js
// {% link title, url %}
// {% link title, url, img %}
hexo.extend.tag.register('link', function(args) {
  var configtemp = hexo.config.tag_plugins || hexo.theme.config.tag_plugins
  args = args.join(' ').split(',')
  let text = ''
  let url = ''
  let img = ''
  if (args.length < 2) {
    return
  } else if (args.length == 2) {
    text = args[0].trim()
    url = args[1].trim()
  } else if (args.length == 3) {
    text = args[0].trim()
    url = args[1].trim()
    img = args[2].trim()
  }
  let result = '';
  // 发现如果不套一层 div 在其它可渲染 md 的容器中容易被分解
  result += '<div class="tag link"><a class="link-card" title="' + text + '" href="' + url + '">';
  // left
  result += '<div class="left">';
  result += '<img src="' + (img || configtemp.link.placeholder) + '"/>';
  result += '</div>';
  // right
  result += '<div class="right"><p class="text">' + text + '</p><p class="url">' + url + '</p></div>';
  result += '</a></div>';

  return result;
});

hexo.extend.tag.register('linkgroup', function(args, content) {
  let ret = '';
  ret += '<div class="link-group">';
  ret += content;
  ret += '</div>';
  return ret;
}, {ends: true});

//media.js
function postAudio(args) {
  let src = args[0].trim()
  return `<div class="audio"><audio controls preload><source src='${src}' type='audio/mp3'>Your browser does not support the audio tag.</audio></div>`;
}

function postVideo(args) {
  let src = args[0].trim()
  return `<div class="video"><video controls preload><source src='${src}' type='video/mp4'>Your browser does not support the video tag.</video></div>`;
}

function postVideos(args, content) {
  args = args.join(' ').split(',')
  var cls = args[0]
  if (cls.length > 0) {
    cls = ' ' + cls
  }
  var col = Number(args[1]) || 0;
  if (col > 0) {
    return `<div class="videos${cls}" col='${col}'>${content}</div>`
  } else {
    return `<div class="videos${cls}">${content}</div>`
  }
}

hexo.extend.tag.register('audio', postAudio);
hexo.extend.tag.register('video', postVideo);
hexo.extend.tag.register('videos', postVideos, {ends: true});

//notation.js
function Nota(args) {
  args = args.join(' ').split(',')
  let p0 = args[0].trim()
  let p1 = args[1].trim()
  return `<span class='nota' data-nota='${p1}'>${p0}</span>`;
}

hexo.extend.tag.register('nota', Nota);
// {% nota 注释词汇 ,'注释内容，使用逗号间隔开了即可' %}


//bubble.js

function bubble (args) {
  args = args.join(' ').split(',')
  let content = args[0]
  let notation = args[1]
  let color = args[2] ? args[2] : '#71a4e3'

  return `<span class="bubble-content">${content}</span><span class="bubble-notation"><span class="bubble-item" style="background-color:${color};">${notation}</span></span>`
}

hexo.extend.tag.register('bubble', bubble, { ends: false })

/**
 * bubble
 * {% bubble content,notation[,background-color] %}
 */

//reference.js

/*
{% referto 'id','literature' %}
{% referfrom 'id','literature','url' %}
*/

function referto (args) {
  args = args.join(' ').split(',')
  let referid = args[0]
  let literature = args[1]
  return `<span class="hidden-anchor" id="referto_${referid}"></span><sup class="reference"><a href="#referfrom_${referid}">${referid}</a></sup><span class="reference-bubble"><span class="reference-item"><span class="reference-literature">${literature}</span><span class="reference-title">参考资料</span></span></span>`;
}


function referfrom (args) {
  args = args.join(' ').split(',')
  let fromid = args[0]
  let fromliterature = args[1]
  let referurl = args[2] ? urlFor(args[2]) : 'javascript:void'
  return `<div class="reference-source"><span class="hidden-anchor" id="referfrom_${fromid}"></span><a class="reference-anchor" href="#referto_${fromid}">${fromid}<div class="reference-anchor-up fa-solid fa-angles-up"></div></a><a class="reference-link" href="${referurl}">${fromliterature}</a></div>`;

}

hexo.extend.tag.register('referto',referto);
hexo.extend.tag.register('referfrom',referfrom);


//poem.js
'use strict'

function poem (args, content) {
  args = args.join(' ').split(',')
  let p0 = args[0]
  let p1 = args[1]?args[1]:''
  return `<div class='poem'><div class='poem-title'>${p0}</div><div class='poem-author'>${p1}</div>${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div>`
}

hexo.extend.tag.register('poem',poem,{ ends: true });

//poem.js
function postprogress(args) {
  args = args.join(',').split(',')
  if (args.length > 1) {
    let pwidth = args[0].trim()
    let pcolor = args[1].trim()
    let text = args[2].trim()
    return `<div class="progress"><div class="progress-bar-animated progress-bar progress-bar-striped bg-${pcolor}"  style="width: ${pwidth}%" aria-valuenow="${pwidth}" aria-valuemin="0" aria-valuemax="100">${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}</div></div>`;
  }
}
hexo.extend.tag.register('progress', postprogress);

//progress.js
function postprogress(args) {
  args = args.join(',').split(',')
  if (args.length > 1) {
    let pwidth = args[0].trim()
    let pcolor = args[1].trim()
    let text = args[2].trim()
    return `<div class="progress"><div class="progress-bar-animated progress-bar progress-bar-striped bg-${pcolor}"  style="width: ${pwidth}%" aria-valuenow="${pwidth}" aria-valuemin="0" aria-valuemax="100">${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}</div></div>`;
  }
}
hexo.extend.tag.register('progress', postprogress);

//site.js
function postSiteCardGroup(args, content) {
  if (args.length > 0) {
    return `<div class="site-card-group"><p class='p h2'>${args}</p>${content}</div>`;
  } else {
    return `<div class="site-card-group">${content}</div>`;
  }
}
function postSiteCard(args) {
  args = args.join(' ').split(', ')
  // 所有支持的参数
  let title = args[0].trim();
  let url = '';
  let screenshot = '';
  let avatar = '';
  let description = '';
  // 解析
  if (args.length > 1) {
    for (let i = 1; i < args.length; i++) {
      let tmp = args[i].trim();
      if (tmp.includes('url=')) {
        url = tmp.substring(4, tmp.length);
      } else if (tmp.includes('screenshot=')) {
        screenshot = tmp.substring(11, tmp.length);
      } else if (tmp.includes('avatar=')) {
        avatar = tmp.substring(7, tmp.length);
      } else if (tmp.includes('description=')) {
        description = tmp.substring(12, tmp.length);
      }
    }
  }
  // 布局
  let result = '';
  result += '<a class="site-card" href="' + url + '">';
  result += '<div class="img"><img src="' + screenshot + '"/></div>';
  result += '<div class="info">';
  if (avatar.length > 0) {
    result += '<img src="' + avatar + '"/>';
  } else {

  }

  result += '<span class="title">' + title + '</span>';
  if (description.length > 0) {
    result += '<span class="desc">' + description + '</span>';
  } else {

  }

  result += '</div></a>';
  return result;

}

// {% site link, img, title %}
// {% site link, img, title, description %}
hexo.extend.tag.register('site', postSiteCard);
hexo.extend.tag.register('sitegroup', postSiteCardGroup, {ends: true});

//span.js
function postP(args) {
  args = args.join(' ').split(',')
  let p0 = args[0].trim()
  let p1 = args[1].trim()
  return `<p class='p ${p0}'>${p1}</p>`;
}
function postSpan(args) {
  args = args.join(' ').split(',')
  let p0 = args[0].trim()
  let p1 = args[1].trim()
  return `<span class='p ${p0}'>${p1}</span>`;
}

hexo.extend.tag.register('p', postP);
hexo.extend.tag.register('span', postSpan);

//tip.js
function tip (args, content) {
  const tipclass = args ? args.join(' ') : 'info'
  return `<div class="tip ${args.join(' ')}">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div>`
}

hexo.extend.tag.register('tip',tip, { ends: true })

//carousel.js
function carousel (args, content) {
  args = args.join(' ').split(',')
  let carouselId = args[0]
  let carouselname = args[1]?args[1]:'carousel'
  return `<div id='${carouselId}' class='carousel'><div id="${carouselId}-drag-container" class="drag-container"><div id="${carouselId}-spin-container" class="spin-container">${hexo.render.renderSync({ text: content, engine: 'markdown' }).replace(/^(\s|<p>)+|(\s|<\/p>)+$/g, '')}<p>${carouselname}</p></div><div id="${carouselId}-carousel-ground" class="carousel-ground"></div></div></div><script type="text/javascript">carouselinit('${carouselId}');</script>`
}

hexo.extend.tag.register('carousel',carousel,{ ends: true });
