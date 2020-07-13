// 地图中心点，陕西
var centerPoint = [35.63452, 109.132287];

// 创建 map 实例
var map = L.map('map', {
  center: centerPoint,
  zoom: 5,
  minZoom: 1,
  maxZoom: 16,
  attributionControl: !1  
})

// 创建 图层

var mapServerUrl = "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}";

// 添加图层
L.tileLayer(mapServerUrl, {
  opacity: 1,
  zIndex: 0
}).addTo(map)

// 自定义
var attr = L.control.attribution()
attr.addAttribution("旅游地图相册Demo——那些我去过的城市");
attr.addAttribution('<a href="http://giscafer.com" target="_blank">@giscafer</a>');
attr.addTo(this.map);

// 数据请求

$.get('./data/data.json', (res) => {
  console.log('re', res)
  drawFootPoint(res.rows)
})

// 图标icon介绍两个网站可以下载:www.iconfont.cn 和 www.easyicon.net
var footIcon = L.icon({
  iconUrl: './foot.png',
  iconSize: [28, 28],
  iconAnchor: [10, 10]
});

function drawFootPoint(data) {
  data.forEach(p => {
    // maker [纬度,经度]
    let point = [p.latitude - 0, p.longitude - 0]
    L.marker(point, { icon: footIcon }).addTo(map)
      .bindPopup(
        `<h3>${p['city']}</h3>${p['date']}<br>${p['remark']}<br>${generatePicHtml(p['imgs'])}`
      )
  })
}

/**
 * 动态拼接html字符串
 * @param {string} cityName 城市名称
 * @param {*} imgs 足迹点数据中的imgs数组
 */
/**
 * 动态拼接html字符串
 * @param {*} imgs 足迹点数据中的imgs数组
 */
function generatePicHtml(imgs) {
  // 动态拼接html字符串
  var _html = '<div id="galley"><ul class="pictures"  onclick="viewPic()">';
  // 循环图片数组，动态拼接项目的相对地址url
  for (var i = 0; i < imgs.length; i++) {
      var url = './data/pictures/' + imgs[i];
      var display = 'style="display:inline-block"';
      // 这里
      if (i > 5) {
          display = 'style="display:none"';
      }
      _html += '<li ' + display + '><img data-original="' + url + '" src="' + url + '" alt="图片预览"></li>';
  }
  _html += '</ul></div></div>';

  return _html;
}

/**
 * veiwerjs预览大图
 */
function viewPic() {

  var galley = document.getElementById('galley');
  var viewer = new Viewer(galley, {
      url: 'data-original',
      hidden: function () {
          viewer.destroy();
      }
  });
  viewer.show();
}