//index.js
import { BarCode } from '../../barcode/index';
Page({

    data: {
        code: '123456789012345'
    },
    onShow: function () {
        const canva = new BarCode('#barcode2', this.data.code, {
            marginBetween: 10,
        });
        canva.render();
        
    }
})
