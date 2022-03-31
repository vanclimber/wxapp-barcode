import { CODE128 } from "../../barcode/index";
Component({
  data: {
    text: "ABCD12345",
  },
  // 组件生命周期
  lifetimes: {
    ready() {
      CODE128('#barcode', this.data.text, {
        canvasType: '2d',
        width: 500,
        height: 200,
        lineColor: "red"
      },this)
    },
  },
});
