# wxapp-barcode
在微信小程序中快速生成条形码，目前支持code128类型

## 效果截图

## 安装
```
$ npm install wxapp-barcode
```

## 使用方法

在wxml中：
```html
<canvas id="barcode" type="2d" style="width: 200px; height: 100px;"/>
```

其中，id用于获取该canvas节点， type="2d"属性是必要的。宽高必须显示设置,且和options内的宽高相等

在js中：
```javascript
import { BarCode } from "../../barcode/index";

...
const canva = new BarCode('#barcode', 'ABCD123456', {
    autoFill:true,
    width: 200,
    height:100,
    lineColor: 'blue'
});
canva.render();
// BarCode在new的时候并不会进行渲染，在调用render之后才会执行渲染。
```


函数原型：new BarCode(selector, text, options[, component]);

参数
- selector: 传入的元素选择器，用于获取canvas节点。因此建议使用id选择器，保证唯一性。
- text: 生成条形码的字符串。只能传入ASCII码内存在的字符。
- options: 一些可选的参数，用于配置绘制模式，条形码颜色等属性。
- component: 因为在自定义组件中，需要通过调用 `this.createSelectorQuery()` 才能正确获取到节点，因此在自定义组件内需要将组件传入。[参考文档](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createSelectorQuery.html)

## 例子
详见`example`文件夹。内有普通页面和自定义组件中的用法。

## options

| option | 默认值 | 类型 | 可选 | 描述|
|---|---|---|---|---|---|
|width| `300` | `Number` | -- | canvas的宽度，**务必和wxml内的行内样式保持一致**|
|height| `150` |`Number` | -- | canvas的高度，**务必和wxml内的行内样式保持一致**|
|lineWidth| `2`| `Number` | -- | 条形码码条的标准宽度，过宽将导致条码显示不完全，过窄则难以识别|
|lineHeight| `100` |`Number` | -- | 条形码码条的高度|
|autoFill| `false`| `Boolean` | `false`/`true` | 条形码将自动填充canvas的宽高。该属性设置为true之后，`lineWidth`和`lineHeight`属性将失效|
|lineColor| `#000000`| `String (CSS color)` | -- | 条形码的颜色，默认为黑色。|
|`paddingLeft`| `10`| `Number` | -- | 条形码绘制时左侧的padding|
|`paddingRight`| `10`| `Number` | -- | 条形码绘制时右侧的padding。（仅当`autoFill=true`时生效，因为`lineWidth`有可能侵蚀右侧padding）|
|`paddingTop`| `0`| `Number` | -- | 条形码绘制时上侧的padding|
|`paddingBottom`| `0`| `Number` | -- | 条形码绘制时下侧的padding。（仅当`autoFill=true`时生效，因为`lineHeight`有可能侵蚀下侧padding）|


