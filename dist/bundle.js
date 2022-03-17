import"core-js/modules/es.regexp.exec.js";import"core-js/modules/es.parse-int.js";import"core-js/modules/es.string.match.js";import"core-js/modules/es.regexp.constructor.js";import"core-js/modules/es.regexp.to-string.js";import"core-js/modules/es.string.split.js";function ownKeys(e,t){var r,o=Object.keys(e);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(e),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),o.push.apply(o,r)),o}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach(function(t){_defineProperty(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function _defineProperty(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}const SET_A=0,SET_B=1,SET_C=2,SHIFT=98,START_A=103,START_B=104,START_C=105,MODULO=103,STOP=106,SET_BY_CODE={[START_A]:SET_A,[START_B]:SET_B,[START_C]:SET_C},SWAP={101:SET_A,100:SET_B,99:SET_C},A_START_CHAR=String.fromCharCode(208),B_START_CHAR=String.fromCharCode(209),C_START_CHAR=String.fromCharCode(210),A_CHARS="[\0-_È-Ï]",B_CHARS="[ -È-Ï]",C_CHARS="(Ï*[0-9]{2}Ï*)",PATTERNS=[[2,1,2,2,2,2,0,0],[2,2,2,1,2,2,0,0],[2,2,2,2,2,1,0,0],[1,2,1,2,2,3,0,0],[1,2,1,3,2,2,0,0],[1,3,1,2,2,2,0,0],[1,2,2,2,1,3,0,0],[1,2,2,3,1,2,0,0],[1,3,2,2,1,2,0,0],[2,2,1,2,1,3,0,0],[2,2,1,3,1,2,0,0],[2,3,1,2,1,2,0,0],[1,1,2,2,3,2,0,0],[1,2,2,1,3,2,0,0],[1,2,2,2,3,1,0,0],[1,1,3,2,2,2,0,0],[1,2,3,1,2,2,0,0],[1,2,3,2,2,1,0,0],[2,2,3,2,1,1,0,0],[2,2,1,1,3,2,0,0],[2,2,1,2,3,1,0,0],[2,1,3,2,1,2,0,0],[2,2,3,1,1,2,0,0],[3,1,2,1,3,1,0,0],[3,1,1,2,2,2,0,0],[3,2,1,1,2,2,0,0],[3,2,1,2,2,1,0,0],[3,1,2,2,1,2,0,0],[3,2,2,1,1,2,0,0],[3,2,2,2,1,1,0,0],[2,1,2,1,2,3,0,0],[2,1,2,3,2,1,0,0],[2,3,2,1,2,1,0,0],[1,1,1,3,2,3,0,0],[1,3,1,1,2,3,0,0],[1,3,1,3,2,1,0,0],[1,1,2,3,1,3,0,0],[1,3,2,1,1,3,0,0],[1,3,2,3,1,1,0,0],[2,1,1,3,1,3,0,0],[2,3,1,1,1,3,0,0],[2,3,1,3,1,1,0,0],[1,1,2,1,3,3,0,0],[1,1,2,3,3,1,0,0],[1,3,2,1,3,1,0,0],[1,1,3,1,2,3,0,0],[1,1,3,3,2,1,0,0],[1,3,3,1,2,1,0,0],[3,1,3,1,2,1,0,0],[2,1,1,3,3,1,0,0],[2,3,1,1,3,1,0,0],[2,1,3,1,1,3,0,0],[2,1,3,3,1,1,0,0],[2,1,3,1,3,1,0,0],[3,1,1,1,2,3,0,0],[3,1,1,3,2,1,0,0],[3,3,1,1,2,1,0,0],[3,1,2,1,1,3,0,0],[3,1,2,3,1,1,0,0],[3,3,2,1,1,1,0,0],[3,1,4,1,1,1,0,0],[2,2,1,4,1,1,0,0],[4,3,1,1,1,1,0,0],[1,1,1,2,2,4,0,0],[1,1,1,4,2,2,0,0],[1,2,1,1,2,4,0,0],[1,2,1,4,2,1,0,0],[1,4,1,1,2,2,0,0],[1,4,1,2,2,1,0,0],[1,1,2,2,1,4,0,0],[1,1,2,4,1,2,0,0],[1,2,2,1,1,4,0,0],[1,2,2,4,1,1,0,0],[1,4,2,1,1,2,0,0],[1,4,2,2,1,1,0,0],[2,4,1,2,1,1,0,0],[2,2,1,1,1,4,0,0],[4,1,3,1,1,1,0,0],[2,4,1,1,1,2,0,0],[1,3,4,1,1,1,0,0],[1,1,1,2,4,2,0,0],[1,2,1,1,4,2,0,0],[1,2,1,2,4,1,0,0],[1,1,4,2,1,2,0,0],[1,2,4,1,1,2,0,0],[1,2,4,2,1,1,0,0],[4,1,1,2,1,2,0,0],[4,2,1,1,1,2,0,0],[4,2,1,2,1,1,0,0],[2,1,2,1,4,1,0,0],[2,1,4,1,2,1,0,0],[4,1,2,1,2,1,0,0],[1,1,1,1,4,3,0,0],[1,1,1,3,4,1,0,0],[1,3,1,1,4,1,0,0],[1,1,4,1,1,3,0,0],[1,1,4,3,1,1,0,0],[4,1,1,1,1,3,0,0],[4,1,1,3,1,1,0,0],[1,1,3,1,4,1,0,0],[1,1,4,1,3,1,0,0],[3,1,1,1,4,1,0,0],[4,1,1,1,3,1,0,0],[2,1,1,4,1,2,0,0],[2,1,1,2,1,4,0,0],[2,1,1,2,3,2,0,0],[2,3,3,1,1,1,2,0]];class Graphics{constructor(t,e){var{marginBetween:e=10,width:r=2,height:o=100}=e;this.width=r,this.height=o,this.quiet=e,this.area={top:0,left:this.quiet},this.ctx=t}_fillRect(t,e,r,o){this.ctx.fillRect(t,e,r,o)}autoFill(e){const{width:r,height:o,ctx:n}=this;let c=this.area.left;var i=this.area.top;for(let t=0;t<e.length;t++)for(var s=e[t],a=0;a<8;a+=2){var h=PATTERNS[s][a]*r,l=PATTERNS[s][a+1]*r;0<h&&n.fillRect(c,i,h,o),c+=h+l}}}const code128=function(t,e,r){e=encode(e);new Graphics(t,r).autoFill(e)},matchSetALength=t=>t.match(new RegExp("^".concat(A_CHARS,"*")))[0].length,matchSetBLength=t=>t.match(new RegExp("^".concat(B_CHARS,"*")))[0].length,matchSetC=t=>t.match(new RegExp("^".concat(C_CHARS,"*")))[0];function autoSelectFromAB(t,e){var r=e?A_CHARS:B_CHARS,o=t.match(new RegExp("^(".concat(r,"+?)(([0-9]{2}){2,})([^0-9]|$)")));if(o)return o[1]+String.fromCharCode(204)+autoSelectFromC(t.substring(o[1].length));o=t.match(new RegExp("^".concat(r,"+")))[0];return o.length===t.length?t:o+String.fromCharCode(e?205:206)+autoSelectFromAB(t.substring(o.length),!e)}function autoSelectFromC(t){var e=matchSetC(t),r=e.length;if(r===t.length)return t;t=t.substring(r);r=matchSetALength(t)>=matchSetBLength(t);return e+String.fromCharCode(r?206:205)+autoSelectFromAB(t,r)}function auto(t){let e;var r=matchSetC(t).length;return e=2<=r?C_START_CHAR+autoSelectFromC(t):((r=matchSetALength(t)>matchSetBLength(t))?A_START_CHAR:B_START_CHAR)+autoSelectFromAB(t,r)}function encode(t,e){let r="",o=[];r=auto(t);var n,t=(o=r.split("").map(t=>t.charCodeAt(0))).shift()-105,c=SET_BY_CODE[t];if(void 0===c)throw new RangeError("The encoding does not start with a start character.");let i=[],s=0,a=1,h=c;for(;0<o.length;){let t;200<=o[0]?(t=o.shift()-105,void 0!==(n=SWAP[t])?h=n:h!==SET_A&&h!==SET_B||t!==SHIFT||(o[0]=h===SET_A?95<o[0]?o[0]-96:o[0]:o[0]<32?o[0]+96:o[0])):t=correctIndex(o,h),i.push(t),s+=t*a,a++}return i.unshift(t),i=i.concat([(s+t)%MODULO,STOP])}function correctIndex(t,e){var r;return e===SET_A?(r=t.shift())<32?r+64:r-32:e===SET_B?t.shift()-32:10*(t.shift()-48)+t.shift()-48}class BarCode{constructor(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"",r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},o=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;this.selector=t,this.text=e,this.options=r,this.component=o}options(t){return this.options=_objectSpread2(_objectSpread2({},this.options),t),this}getCTX(r){var t;const{component:e,selector:o}=this,n=(null==e||null==(t=e.createSelectorQuery)?void 0:t.call(e))||wx.createSelectorQuery();console.log(n),n.select(o).fields({node:!0}).exec(t=>{const e=null==(t=t[0])?void 0:t.node;e?(t=e.getContext("2d"),console.log(t),r(t)):console.warn("[wxapp-barcode]: have not found this node by this selector: ".concat(o))})}render(){const{text:e,options:r}=this,{lineColor:o="#000000"}=r;this.getCTX(t=>{t.fillStyle=o,code128(t,e,r)})}}export{BarCode,BarCode as default};