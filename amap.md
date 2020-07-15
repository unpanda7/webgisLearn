# 高德地图

> demo-key e9967b4da68ff14a9edce0bdb738a42c

## 生命周期

- 创建
- 加载完成
- 销毁
- 异步加载

### 创建

```javascript
new AMap('container', config)
```

### 加载完成

```javascript
map = new AMap('container', config)
map.on('complete', () => console.log('success'))
```

### 销毁

```javascript
map && map.destory()
```

### 异步加载

> 类型 jsonp 的格式

```javascript
    function onApiLoaded(){
        var map = new AMap.Map('container', {
            center: [117.000923, 36.675807],
            zoom: 6
        });
        map.plugin(["AMap.ToolBar"], function() {
            map.addControl(new AMap.ToolBar());
        });
    }
     var url = 'https://webapi.amap.com/maps?v=1.4.15&key=您申请的key值&callback=onApiLoaded';
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
```

##