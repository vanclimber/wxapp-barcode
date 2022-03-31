//index.js
import { CODE128 } from '../../barcode/index';
Page({

    data: {
        code: '123456789012345678'
    },
    onShow: function () {
        CODE128('barcode2', this.data.code, {
            width: 680,
            height: 200,
        })
        
    }
})
