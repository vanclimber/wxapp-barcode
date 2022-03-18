import { code128 } from "./code128/code128";

export class BarCode {
    constructor(selector, text = "", options = {},component = null) {
        this.selector = selector;
        this.text = text;
        const { width = 300,height = 150 } = options;
        this.options = {
            ...options,
            width,
            height
        };
        this.component = component;
    }

    setOptions(options) {
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
        query
            .select(selector)
            .fields({ node: true,size: true })
            .exec((res) => {
                const elem = res[0];
                if (elem && elem.node) {
                    const { width, height} = this.options;
                    elem.node.width = width;
                    elem.node.height = height;
                    const ctx = elem.node.getContext("2d");
                    callback(ctx);
                } else {
                    console.warn(`[wxapp-barcode]: have not found this node by this selector: ${selector}`);
                }
            });
    }
    
    render() {
        this.getCTX((ctx) => {
            code128(ctx, this.text, this.options);
        });
    }
}

