/**
 * https://github.com/anuraghazra/github-readme-stats
 */

'use strict';

// {% ghcard volantis-x %}
// {% ghcard volantis-x/hexo-theme-volantis %}
hexo.extend.tag.register('ghcard', function(args) {
  var configtemp = hexo.config.tag_plugins || hexo.theme.config.tag_plugins
  var ghcard_url= configtemp.CDN.ghcard_url ? urlFor(configtemp.CDN.ghcard_url) : 'https://github-readme-stats.vercel.app'
  args = args.join(' ').split(', ');
  let path = args[0].trim();
  let card = '';
  card += '<a class="ghcard" rel="external nofollow noopener noreferrer" href="https://github.com/' + path + '">';
  let url = '';
  if (path.includes('/')) {
    // is repo
    let ps = path.split('/');
    url += ghcard_url + '/api/pin/?username=' + ps[0] + "&repo=" + ps[1];
  } else {
    // is user
    url += ghcard_url + '/api/?username=' + path;
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
