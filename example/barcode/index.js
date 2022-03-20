import { code128 } from "./code128/code128";

export class BarCode {
    constructor(selector, text = "", options = {},component = null) {
        this.selector = selector;
        this.text = text;
        this.options = {
            ...options,
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

    getNode(callback) {
        const { component, selector } = this;
        // 自定义组件中获取canvas的ctx需要调用this.createSelectorQuery
        const query = component?.createSelectorQuery?.() || wx.createSelectorQuery();
        query
            .select(selector)
            .fields({ node: true,size: true })
            .exec((res) => {
                if (res[0] && res[0].node) {
                    callback(res[0].node);
                } else {
                    console.warn(`[wxapp-barcode]: have not found this node by this selector: ${selector}`);
                }
            });
    }
    
    render() {
        this.getNode((node) => {
            code128(node, this.text, this.options);
        });
    }
}

