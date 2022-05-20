import code128 from "./code128/code128";

export function CODE128(selector, text = "", options = {}, component) {
  const { canvasType } = options;
  if (text.length <= 0) {
    console.warn(
      "[wxapp-barcode]: text should not empty or nullish"
    );
    return;
  }

  if (canvasType === "2d") {
    const query =
      component?.createSelectorQuery?.() || wx.createSelectorQuery();
    query
      .select(selector)
      .fields({ node: true, size: true })
      .exec((res) => {
        const node = res[0]?.node
        if (node) {
          const { width, height } = options;
          // pixelRatio并不等于真实的设备像素比
          // const dpr = wx.getSystemInfoSync().pixelRatio;

          const ctx = node.getContext("2d");
          // 解决高清屏模糊问题
          const trueDpr = 750 / wx.getSystemInfoSync().windowWidth
          node.width = width;
          node.height = height;
          ctx.scale(trueDpr,trueDpr)
          code128(ctx, `${text}`, options);
        } else {
          console.warn(
            `[wxapp-barcode]: have not found this node by this selector: ${selector}`
          );
        }
      });
  } else {
    const ctx = wx.createCanvasContext(selector, component);
    code128(ctx, `${text}`, options);
  }
}