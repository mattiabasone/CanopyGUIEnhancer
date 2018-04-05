/**
 * Utils
 */

/**
 * Like PHP preg_quote
 *
 * @param str
 * @returns {string}
 */
RegExp.quote = function(str) {
    return (str+'').replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
};

/**
 * From Byte to Mbit
 *
 * @returns {number}
 */
Number.prototype.byte2Mbit = function() {
    return ((this * 8) / 1000000);
};

/**
 *
 * @returns {*}
 */
Number.prototype.formatDataUsage = function() {
    var num;
    if (this >= 1000000000000) {
        num = Math.round(this / 1099511627776);
        num = num + 'TB';
    } else if (this >= 1000000000) {
        num = Math.round(this / 1073741824);
        num = num + 'GB';
    } else if (this >= 1000000) {
        num = Math.round(this / 1048576);
        num = num + 'MB';
    } else if (this >= 1000) {
        num = Math.round(this / 1024);
        num = num + 'kB';
    } else {
        num = Math.round(this) + 'B';
    }
    return num;
};

/**
 * Round 2 dec
 *
 * @returns Number
 */
Number.prototype.round2 = function() {
    return Math.round(this * 100) / 100;
};

/**
 * Trim blank char
 *
 * @returns {string}
 */
String.prototype.trimBlank = function() {
    return this.replace(/^\s+|\s+$/g, '');
};

/**
 * Is a MAC Address?
 *
 * @returns {boolean}
 */
String.prototype.isMAC = function() {
    var res = this.match(/^(([0-9A-Fa-f]{2}[:-]?){5}([0-9A-Fa-f]{2}))$/);
    if (res !== null) {
        return true;
    } else {
        return false;
    }
};

/**
 * Check if is a public IP
 *
 * @returns {boolean}
 */
String.prototype.isValidPubIP = function() {
    var match1 = this.match(/^((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))$/);
    if (match1 != null) {
        var match2 = this.match(/((^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.))/);
        if (match2 == null) {
            return true;
        }
    }
    return false;
};

/**
 * Leading zero for string
 *
 * @returns {string}
 */
Number.prototype.leadingZero = function() {
    return ('0'+this).slice(-2);
};

/**
 * IndexOf with regex
 *
 * @param regex
 * @param startpos
 * @returns {Number}
 */
String.prototype.regexIndexOf = function(regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
};

/**
 * LastIndexOf with regex
 *
 * @param regex
 * @param startpos
 * @returns {number}
 */
String.prototype.regexLastIndexOf = function(regex, startpos) {
    regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
    if(typeof (startpos) == "undefined") {
        startpos = this.length;
    } else if(startpos < 0) {
        startpos = 0;
    }
    var stringToWorkWith = this.substring(0, startpos + 1);
    var lastIndexOf = -1;
    var nextStop = 0;
    while((result = regex.exec(stringToWorkWith)) != null) {
        lastIndexOf = result.index;
        regex.lastIndex = ++nextStop;
    }
    return lastIndexOf;
};

/**
 * intval() like PHP
 *
 * @param number
 * @returns {*}
 */
function intval(number) {
    number = Number(number);
    if (!isNaN(number)) {
        return number;
    }
    return 0;
}

/**
 * JSONP Function
 *
 * @param url
 * @param callback
 */
function jsonp(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

/**
 * Escape HTML
 *
 * @param str
 * @returns {string}
 */
function escapeHTML(str) {
    // Note: string cast using String; may throw if `str` is non-serializable, e.g. a Symbol.
    // Most often this is not the case though.
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Load JS script Async
 * @param path
 */
function loadJS(path) {
    var newBlock = document.createElement("script");
    newBlock.src = path;
    newBlock.async = true;
    newBlock.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(newBlock);
}

/**
 * Load CSS Async
 * @param path
 */
function loadCSS(path) {
    var newBlock = document.createElement("link");
    newBlock.href = path;
    newBlock.rel = "stylesheet";
    newBlock.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(newBlock);
}


function highlightErrorsInText(searchText, text) {
    var returnText;
    var tmpRegExp = new RegExp("("+RegExp.quote(searchText)+")", 'gi');
    returnText = text.replace(tmpRegExp,"<span class='cge-bad-power-level'>$1</span>");
    return returnText;
}

/**
 * JS Extension
 */

/**
 * Empty element content
 */
Element.prototype.emptyElement = function() {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }
};