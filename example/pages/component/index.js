import { BarCode } from "../../barcode/index";
Component({
  data: {
    text: "ABCD12345",
  },
  // 组件生命周期
  lifetimes: {
    ready() {
      const canva = new BarCode("#barcode", this.data.text, {
        autoFill: true,
        width: 200,
        height:100,
        lineColor: "red",
      },this); // 自定义组件中获取canvas的ctx需要调用this.createSelectorQuery,因此需要将this传入
      canva.render();
    },
  },
});
