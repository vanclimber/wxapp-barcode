import { code128 } from "./code128/code128";

export class BarCode {
    constructor(selector, text = "", options = {},component = null) {
        this.selector = selector;
        this.text = text;
        this.options = options;
        this.component = component;
    }

    options(options) {
        this.options = {
            ...this.options,
            ...options,
        };
        return this;
    }

    getCTX(callback) {
        const { component, selector } = this;
        // 自定义组件中获取canvas的ctx需要调用this.createSelectorQuery
        const query = component?.createSelectorQuery?.() || wx.createSelectorQuery();
        console.log(query);
        query
            .select(selector)
            .fields({ node: true })
            .exec((res) => {
                const canvas = res[0]?.node;
                if (canvas) {
                    const ctx = canvas.getContext("2d");
                    console.log(ctx);
                    callback(ctx);
                } else {
                    console.warn(`[wxapp-barcode]: have not found this node by this selector: ${selector}`);
                }
            });
    }
    
    render() {
        const { text, options } = this;
        const {
            lineColor = "#000000",
            backgroundColor = "#FFFFFF",
        } = options;
        this.getCTX((ctx) => {
            ctx.fillStyle = lineColor;
            code128(ctx, text, options);
        });
    }
}

export default BarCode;
