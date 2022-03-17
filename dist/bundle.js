// constants for internal usage
const SET_A = 0;
const SET_B = 1;
const SET_C = 2;

// Special characters
const SHIFT = 98;
const START_A = 103;
const START_B = 104;
const START_C = 105;
const MODULO = 103;
const STOP = 106;

// Get set by start code
const SET_BY_CODE = {
	[START_A]: SET_A,
	[START_B]: SET_B,
	[START_C]: SET_C,
};

// Get next set by code
const SWAP = {
	101: SET_A,
	100: SET_B,
	99: SET_C,
};

const A_START_CHAR = String.fromCharCode(208); // START_A + 105
const B_START_CHAR = String.fromCharCode(209); // START_B + 105
const C_START_CHAR = String.fromCharCode(210); // START_C + 105

// 128A (Code Set A)
// ASCII characters 00 to 95 (0–9, A–Z and control codes), special characters, and FNC 1–4
const A_CHARS = "[\x00-\x5F\xC8-\xCF]";

// 128B (Code Set B)
// ASCII characters 32 to 127 (0–9, A–Z, a–z), special characters, and FNC 1–4
const B_CHARS = "[\x20-\x7F\xC8-\xCF]";

// 128C (Code Set C)
// 00–99 (encodes two digits with a single code point) and FNC1
const C_CHARS = "(\xCF*[0-9]{2}\xCF*)";

// CODE128 includes 107 symbols:
// 103 data symbols, 3 start symbols (A, B and C), and 1 stop symbol (the last one)
const PATTERNS = [
    [2, 1, 2, 2, 2, 2, 0, 0], // 0
    [2, 2, 2, 1, 2, 2, 0, 0], // 1
    [2, 2, 2, 2, 2, 1, 0, 0], // 2
    [1, 2, 1, 2, 2, 3, 0, 0], // 3
    [1, 2, 1, 3, 2, 2, 0, 0], // 4
    [1, 3, 1, 2, 2, 2, 0, 0], // 5
    [1, 2, 2, 2, 1, 3, 0, 0], // 6
    [1, 2, 2, 3, 1, 2, 0, 0], // 7
    [1, 3, 2, 2, 1, 2, 0, 0], // 8
    [2, 2, 1, 2, 1, 3, 0, 0], // 9
    [2, 2, 1, 3, 1, 2, 0, 0], // 10
    [2, 3, 1, 2, 1, 2, 0, 0], // 11
    [1, 1, 2, 2, 3, 2, 0, 0], // 12
    [1, 2, 2, 1, 3, 2, 0, 0], // 13
    [1, 2, 2, 2, 3, 1, 0, 0], // 14
    [1, 1, 3, 2, 2, 2, 0, 0], // 15
    [1, 2, 3, 1, 2, 2, 0, 0], // 16
    [1, 2, 3, 2, 2, 1, 0, 0], // 17
    [2, 2, 3, 2, 1, 1, 0, 0], // 18
    [2, 2, 1, 1, 3, 2, 0, 0], // 19
    [2, 2, 1, 2, 3, 1, 0, 0], // 20
    [2, 1, 3, 2, 1, 2, 0, 0], // 21
    [2, 2, 3, 1, 1, 2, 0, 0], // 22
    [3, 1, 2, 1, 3, 1, 0, 0], // 23
    [3, 1, 1, 2, 2, 2, 0, 0], // 24
    [3, 2, 1, 1, 2, 2, 0, 0], // 25
    [3, 2, 1, 2, 2, 1, 0, 0], // 26
    [3, 1, 2, 2, 1, 2, 0, 0], // 27
    [3, 2, 2, 1, 1, 2, 0, 0], // 28
    [3, 2, 2, 2, 1, 1, 0, 0], // 29
    [2, 1, 2, 1, 2, 3, 0, 0], // 30
    [2, 1, 2, 3, 2, 1, 0, 0], // 31
    [2, 3, 2, 1, 2, 1, 0, 0], // 32
    [1, 1, 1, 3, 2, 3, 0, 0], // 33
    [1, 3, 1, 1, 2, 3, 0, 0], // 34
    [1, 3, 1, 3, 2, 1, 0, 0], // 35
    [1, 1, 2, 3, 1, 3, 0, 0], // 36
    [1, 3, 2, 1, 1, 3, 0, 0], // 37
    [1, 3, 2, 3, 1, 1, 0, 0], // 38
    [2, 1, 1, 3, 1, 3, 0, 0], // 39
    [2, 3, 1, 1, 1, 3, 0, 0], // 40
    [2, 3, 1, 3, 1, 1, 0, 0], // 41
    [1, 1, 2, 1, 3, 3, 0, 0], // 42
    [1, 1, 2, 3, 3, 1, 0, 0], // 43
    [1, 3, 2, 1, 3, 1, 0, 0], // 44
    [1, 1, 3, 1, 2, 3, 0, 0], // 45
    [1, 1, 3, 3, 2, 1, 0, 0], // 46
    [1, 3, 3, 1, 2, 1, 0, 0], // 47
    [3, 1, 3, 1, 2, 1, 0, 0], // 48
    [2, 1, 1, 3, 3, 1, 0, 0], // 49
    [2, 3, 1, 1, 3, 1, 0, 0], // 50
    [2, 1, 3, 1, 1, 3, 0, 0], // 51
    [2, 1, 3, 3, 1, 1, 0, 0], // 52
    [2, 1, 3, 1, 3, 1, 0, 0], // 53
    [3, 1, 1, 1, 2, 3, 0, 0], // 54
    [3, 1, 1, 3, 2, 1, 0, 0], // 55
    [3, 3, 1, 1, 2, 1, 0, 0], // 56
    [3, 1, 2, 1, 1, 3, 0, 0], // 57
    [3, 1, 2, 3, 1, 1, 0, 0], // 58
    [3, 3, 2, 1, 1, 1, 0, 0], // 59
    [3, 1, 4, 1, 1, 1, 0, 0], // 60
    [2, 2, 1, 4, 1, 1, 0, 0], // 61
    [4, 3, 1, 1, 1, 1, 0, 0], // 62
    [1, 1, 1, 2, 2, 4, 0, 0], // 63
    [1, 1, 1, 4, 2, 2, 0, 0], // 64
    [1, 2, 1, 1, 2, 4, 0, 0], // 65
    [1, 2, 1, 4, 2, 1, 0, 0], // 66
    [1, 4, 1, 1, 2, 2, 0, 0], // 67
    [1, 4, 1, 2, 2, 1, 0, 0], // 68
    [1, 1, 2, 2, 1, 4, 0, 0], // 69
    [1, 1, 2, 4, 1, 2, 0, 0], // 70
    [1, 2, 2, 1, 1, 4, 0, 0], // 71
    [1, 2, 2, 4, 1, 1, 0, 0], // 72
    [1, 4, 2, 1, 1, 2, 0, 0], // 73
    [1, 4, 2, 2, 1, 1, 0, 0], // 74
    [2, 4, 1, 2, 1, 1, 0, 0], // 75
    [2, 2, 1, 1, 1, 4, 0, 0], // 76
    [4, 1, 3, 1, 1, 1, 0, 0], // 77
    [2, 4, 1, 1, 1, 2, 0, 0], // 78
    [1, 3, 4, 1, 1, 1, 0, 0], // 79
    [1, 1, 1, 2, 4, 2, 0, 0], // 80
    [1, 2, 1, 1, 4, 2, 0, 0], // 81
    [1, 2, 1, 2, 4, 1, 0, 0], // 82
    [1, 1, 4, 2, 1, 2, 0, 0], // 83
    [1, 2, 4, 1, 1, 2, 0, 0], // 84
    [1, 2, 4, 2, 1, 1, 0, 0], // 85
    [4, 1, 1, 2, 1, 2, 0, 0], // 86
    [4, 2, 1, 1, 1, 2, 0, 0], // 87
    [4, 2, 1, 2, 1, 1, 0, 0], // 88
    [2, 1, 2, 1, 4, 1, 0, 0], // 89
    [2, 1, 4, 1, 2, 1, 0, 0], // 90
    [4, 1, 2, 1, 2, 1, 0, 0], // 91
    [1, 1, 1, 1, 4, 3, 0, 0], // 92
    [1, 1, 1, 3, 4, 1, 0, 0], // 93
    [1, 3, 1, 1, 4, 1, 0, 0], // 94
    [1, 1, 4, 1, 1, 3, 0, 0], // 95
    [1, 1, 4, 3, 1, 1, 0, 0], // 96
    [4, 1, 1, 1, 1, 3, 0, 0], // 97
    [4, 1, 1, 3, 1, 1, 0, 0], // 98
    [1, 1, 3, 1, 4, 1, 0, 0], // 99
    [1, 1, 4, 1, 3, 1, 0, 0], // 100
    [3, 1, 1, 1, 4, 1, 0, 0], // 101
    [4, 1, 1, 1, 3, 1, 0, 0], // 102
    [2, 1, 1, 4, 1, 2, 0, 0], // 103
    [2, 1, 1, 2, 1, 4, 0, 0], // 104
    [2, 1, 1, 2, 3, 2, 0, 0], // 105
    [2, 3, 3, 1, 1, 1, 2, 0], // 106
];

class Graphics {
    constructor(ctx, options) {
        const {
            marginBetween = 10,
            width = 2,
            height = 100,
        } = options;
        this.width = width;
        this.height = height;
        this.quiet = marginBetween;

        this.area = {
            top: 0,
            left: this.quiet,
        };
        this.ctx = ctx;
    }

    _fillRect (x, y, width, height) {
        this.ctx.fillRect(x, y, width, height);
    };
    autoFill(codes) {
        const { width,height,ctx } = this;
        // var barWeight = g.area.width / ((codes.length - 3) * 11 + 35);

        let x = this.area.left;
        let y = this.area.top;
        for (let i = 0; i < codes.length; i++) {
            let item = codes[i];
            //two bars at a time: 1 black and 1 white
            for (var bar = 0; bar < 8; bar += 2) {
                var barW = PATTERNS[item][bar] * width;
                var spcW = PATTERNS[item][bar + 1] * width;
    
                //no need to draw if 0 width
                if (barW > 0) {
                    ctx.fillRect(x, y, barW, height);
                }
                x += barW + spcW;
            }
        }
    }
}

const code128 = function (ctx, text, options) {
    var codes = encode(text);
    var g = new Graphics(ctx, options);
    g.autoFill(codes);
};

// Match Set functions
const matchSetALength = (string) =>
    string.match(new RegExp(`^${A_CHARS}*`))[0].length;
const matchSetBLength = (string) =>
    string.match(new RegExp(`^${B_CHARS}*`))[0].length;
const matchSetC = (string) => string.match(new RegExp(`^${C_CHARS}*`))[0];

// CODE128A or CODE128B
function autoSelectFromAB(string, isA) {
    const ranges = isA ? A_CHARS : B_CHARS;
    const untilC = string.match(
        new RegExp(`^(${ranges}+?)(([0-9]{2}){2,})([^0-9]|$)`)
    );

    if (untilC) {
        return (
            untilC[1] +
            String.fromCharCode(204) +
            autoSelectFromC(string.substring(untilC[1].length))
        );
    }

    const chars = string.match(new RegExp(`^${ranges}+`))[0];

    if (chars.length === string.length) {
        return string;
    }

    return (
        chars +
        String.fromCharCode(isA ? 205 : 206) +
        autoSelectFromAB(string.substring(chars.length), !isA)
    );
}

// CODE128C
function autoSelectFromC(string) {
    const cMatch = matchSetC(string);
    const length = cMatch.length;

    if (length === string.length) {
        return string;
    }

    string = string.substring(length);

    // Select A/B depending on the longest match
    const isA = matchSetALength(string) >= matchSetBLength(string);
    return (
        cMatch +
        String.fromCharCode(isA ? 206 : 205) +
        autoSelectFromAB(string, isA)
    );
}

// Detect Code Set (A, B or C) and format the string
function auto(string) {
    let newString;
    const cLength = matchSetC(string).length;

    // Select 128C if the string start with enough digits
    if (cLength >= 2) {
        newString = C_START_CHAR + autoSelectFromC(string);
    } else {
        // Select A/B depending on the longest match
        const isA = matchSetALength(string) > matchSetBLength(string);
        newString =
            (isA ? A_START_CHAR : B_START_CHAR) + autoSelectFromAB(string, isA);
    }

    // return newString.replace(
    // 	/[\xCD\xCE]([^])[\xCD\xCE]/, // Any sequence between 205 and 206 characters
    // 	(match, char) => String.fromCharCode(203) + char
    // );
    return newString;
}

function encode(text, options) {
    // const { format = "CODE128", ena128 = false } = options;
    const format = "CODE128";
    let newText = "";
    let bytes = [];
    switch (format) {
        case "CODE128A":
            break;
        default:
            newText = auto(text);
            break;
    }
    bytes = newText.split("").map((char) => char.charCodeAt(0));

    // Remove the start code from the bytes and set its index
    const startIndex = bytes.shift() - 105;
    // Get start set by index
    const startSet = SET_BY_CODE[startIndex];

    if (startSet === undefined) {
        throw new RangeError(
            "The encoding does not start with a start character."
        );
    }

    let result = [],
        checksum = 0,
        pos = 1,
        set = startSet;

    while (bytes.length > 0) {
        let index;
        // Special characters
        if (bytes[0] >= 200) {
            index = bytes.shift() - 105;
            const nextSet = SWAP[index];
            // Swap to other set
            if (nextSet !== undefined) {
                set = nextSet;
            }
            // Continue on current set but encode a special character
            else {
                // Shift 
                if ((set === SET_A || set === SET_B) && index === SHIFT) {
                    // Convert the next character so that is encoded correctly
                    bytes[0] =
                        set === SET_A
                            ? bytes[0] > 95
                                ? bytes[0] - 96
                                : bytes[0] // bytes[0] is type B
                            : bytes[0] < 32
                            ? bytes[0] + 96
                            : bytes[0];
                }
            }
        }
        // Continue encoding
        else {
            index = correctIndex(bytes, set);
        }
        result.push(index);
        checksum += index * pos;
        pos++;
    }

    result.unshift(startIndex);
    result = result.concat([(checksum + startIndex) % MODULO, STOP]);
    return result;
}

// Correct an index by a set and shift it from the bytes array
function correctIndex(bytes, set) {
    if (set === SET_A) {
        const charCode = bytes.shift();
        return charCode < 32 ? charCode + 64 : charCode - 32;
    } else if (set === SET_B) {
        return bytes.shift() - 32;
    } else {
        return (bytes.shift() - 48) * 10 + bytes.shift() - 48;
    }
}

class BarCode {
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

export { BarCode, BarCode as default };
