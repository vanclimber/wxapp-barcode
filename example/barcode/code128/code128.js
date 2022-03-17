import {
    A_START_CHAR,
    B_START_CHAR,
    C_START_CHAR,
    A_CHARS,
    B_CHARS,
    C_CHARS,
    SHIFT,
    SET_A,
    SET_B,
    MODULO,
    STOP,
    FNC1,
    SET_BY_CODE,
    SWAP,
    PATTERNS,
} from "./constant";

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

export const code128 = function (ctx, text, options) {
    let { width, height } = options;
    width = parseInt(width);
    height = parseInt(height);
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
    const format = "CODE128",
        ena128 = false;
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
    if (ena128) {
        bytes.unshift(FNC1);
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
