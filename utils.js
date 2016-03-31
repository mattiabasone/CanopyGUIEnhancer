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
 * Round 2 dec
 *
 * @returns {number}
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
    var res = this.match(/^(([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2}))$/);
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