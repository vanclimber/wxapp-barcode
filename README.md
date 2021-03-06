# wxapp-barcode
在微信小程序中快速生成条形码，目前支持code128类型。支持旧版的canvas和新的canvas 2D。
目前在新canvas(即canvas 2D)中，在ios设备上存在偶发的兼容性问题，推测为微信使用`同层渲染`带来的影响。

## 效果截图

## 安装
```
$ npm install wxapp-barcode
```

## 使用方法

## canvas 2D用法

在wxml中：
```html
<canvas id="barcode" type="2d" style="width: 400rpx; height: 200rpx;"/>
```

其中，id用于获取该canvas节点， type="2d"属性是必要的。宽高必须显示设置,且和options内的宽高相等

在js中：
```javascript

var Barcode = require('wxbarcode');

...
Barcode.CODE128('#barcode','ABCD123456', {
    canvasType: '2d', //  这里是必填属性，用于声明这是canvas 2D组件
    width: 400, // 声明canvas画布宽度，务必和元素css宽度一致，单位为rpx
    height: 200
})
// 注意，这里第一个参数传的是id选择器，而不是id
```


函数原型：CODE128(selector, text, options[, component]);

参数
- selector： 传入的元素选择器，用于获取canvas节点。因此建议使用id选择器，保证唯一性。
- text： 生成条形码的字符串。只能传入ASCII码内存在的字符。
- options： 一些可选的参数，用于配置绘制模式，条形码颜色等属性。
- component： 因为在自定义组件中，需要通过调用 `this.createSelectorQuery()` 才能正确获取到节点，因此在自定义组件内需要将组件传入。[参考文档](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createSelectorQuery.html)

## 旧canvas用法
在wxml中：
```html
<canvas canvas-id="barcode2" style="width:680rpx; height: 200rpx" />
```

在js中：
```javascript

var Barcode = require('wxbarcode');

...
Barcode.CODE128('barcode2','123456789012345678', {
    width: 680,
    height: 200
})
// 注意，这里第一个参数传的是canvas-id ，就不是选择器了
```

## options

| option | 默认值 | 类型 | 可选 | 描述|
|---|---|---|---|---|
|autoFill| `true`| `Boolean` | `false`/`true` | 条形码将自动填充canvas的宽高。|
|width| -- | `Number` | -- | canvas的宽度，单位为`rpx`，**必填，务必和wxml内的行内样式保持一致**|
|height| -- |`Number` | -- | canvas的高度，单位为`rpx`，**必填，务必和wxml内的行内样式保持一致**|
|lineWidth| `2`| `Number` | -- | 条形码码条的标准宽度，过宽将导致条码显示不完全，过窄则难以识别，该属性只在`autoFill`为false时生效|
|lineHeight| `100` |`Number` | -- | 条形码码条的高度，该属性只在`autoFill`为false时生效|
|lineColor| `#000000`| `String (CSS color)` | -- | 条形码的颜色，默认为黑色。|
|`paddingLeft`| `10`| `Number` | -- | 条形码绘制时左侧的padding|
|`paddingRight`| `10`| `Number` | -- | 条形码绘制时右侧的padding。（仅当`autoFill=true`时生效，因为`lineWidth`有可能侵蚀右侧padding）|
|`paddingTop`| `0`| `Number` | -- | 条形码绘制时上侧的padding|
|`paddingBottom`| `0`| `Number` | -- | 条形码绘制时下侧的padding。（仅当`autoFill=true`时生效，因为`lineHeight`有可能侵蚀下侧padding）|


