/**
 * Canopy GUI Enhancer
 * @constructor
 */
var CanopyEnhancer = function() {
    this.debug = false;
    this.refreshTime = 0;
    this.tooltipMACNode = {};
    this.tooltipIPNode = {};
    this.settings = {};
    this.intervalsTimeout = 0;
    this.currentCatIndex = -1;
    this.currentPageIndex = -1;
    this.currentRadioMAC = "000000000000";
    this.MACLookUpClass = "cge-lookup-mac";
    this.IPLookUpClass = "cge-lookup-ip";

    this.apEvaluationBlock = document.getElementById('APEval'); // #APEval
    this.APEvaluationObj = [];
    this.apSelectionMethod = "";
    this.currentEvaluatinEntry = -1;
    this.currentSessionStatus = "";
    this.titleSeparator = "→";

    this.Sections = [];
    this.Sections[0] = {
        name: "Home",
        pages: {
            1: "General Status",
            5: "Event Log",
            6: "Network Interfaces",
            7: "Layer 2 Neighbors",
            10: "DFS Status"
        }
    };
    this.Sections[1] = {
        name: "Configuration"
    };
    this.Sections[2] = {
        name: "Statistics",
        pages: {
            7: "Ethernet",
            9: "Radio",
            15: "NAT DHCP",
            20: "ARP"
        }
    };
    this.Sections[3] = {
        name: "Tool",
        pages:{
            4: "AP Evaluation"
        }
    };
    this.Sections[5] = {
        name: "Logs",
        pages: {
            9: "NAT Table"
        }
    };
    this.Sections[6] = {
        name: "Accounts"
    };
    this.Sections[8] = {
        name: "PDA"
    };
    this.Sections[9] = {
        name: "Copyright"
    };

    this.evaluationFields = [
        'Frequency',
        'Channel Bandwidth',
        'Cyclic Prefix',
        'ESN',
        'Region',
        'Beacon Receive Power',
        'Beacon Count',
        'FECEn',
        'Type',
        'Multipoint Avail',
        'Age',
        'Lockout',
        'RegFail',
        'Range',
        'MaxRange',
        'TxBER',
        'EBcast',
        'Session Count',
        'NoLUIDS',
        'OutOfRange',
        'AuthFail',
        'EncryptFail',
        'Rescan Req',
        'SMLimitReached',
        'NoVC\'s',
        'VCRsv/430smFail',
        'VCActFail',
        'AP Gain',
        'AP RcvT',
        'SectorID',
        'Color Code',
        'BeaconVersion',
        'SectorUserCount',
        'SyncSrc',
        'NumULSlots',
        'NumDLSlots',
        'NumULContSlots',
        'WhiteSched',
        'ICC',
        'Authentication',
        'SM PPPoE',
        'Frame Period'
    ];
};

/**
 * Initialize CanopyEnhancer
 */
CanopyEnhancer.prototype.initialize = function() {
    var _this = this;

    var head = document.getElementsByTagName('head')[0];
    var stylesheethref = document.getElementsByTagName('link')[0].getAttribute('href');
    var res = stylesheethref.match(/\_canopy\.css\?mac_esn\=([A-Fa-f0-9]{12})/);

    if (res != null) {

        this.currentRadioMAC = res[1].toUpperCase();
        this.identifySection();
        this.getRefreshTime();

        chrome.storage.local.get(null, function (data) {
            if (chrome.runtime.lastError || !data.hasOwnProperty('cge_custom_css')) {
                _this.settings = {
                    cge_enabled: 1,
                    cge_custom_css: 1,
                    cge_ip_lookup: 1,
                    cge_mac_lookup: 1
                };
                chrome.storage.local.set(_this.settings);
            } else {
                _this.settings = data;
            }
            if (_this.debug === true) {
                console.log("Loaded settings:");
                console.log(_this.settings);
            }
            if (_this.settings.cge_enabled === 1) {

                if (_this.debug === true) {
                    console.log("CGE Enabled!");
                    console.log("Current radio MAC " + _this.currentRadioMAC);
                    console.log("Current Section Category: " + _this.getCurrentCatName());
                    console.log("Current Section Page: " + _this.getCurrentPageName());
                }

                _this.realTimeTraffic();
                _this.betterEvaluation();
                _this.ARPPageMacLookup();
                _this.NATTable();

                var path = chrome.extension.getURL('css/style.css');
                head.innerHTML += '<link rel="stylesheet" type="text/css" href="' + path + '" />';
            } else {
                if (_this.debug === true) {
                    console.log("CGE NOT Enabled!");
                }
            }
            _this.enhancedCSS();
            return true;
        });
    }
};

/**
 * Is a Canopy Device?
 * @returns {boolean}
 */
CanopyEnhancer.prototype.isCanopy = function() {
    if (this.currentRadioMAC != '000000000000') {
        return true;
    }
    return false;
};

/**
 * Add Custom CSS
 */
CanopyEnhancer.prototype.enhancedCSS = function() {
    if (this.settings.cge_custom_css === 1) {
        var path;
        var head = document.getElementsByTagName('head')[0];

        path = chrome.extension.getURL('css/bootstrap-mini.css');
        head.innerHTML += '<link rel="stylesheet" type="text/css" href="'+path+'" />';
        if (this.debug === true) {
            console.log("Added bootstrap-mini.css");
        }

        path = chrome.extension.getURL('css/gui.css');
        head.innerHTML += '<link rel="stylesheet" type="text/css" href="'+path+'" />';
        if (this.debug === true) {
            console.log("Added gui.css");
        }

        // Change submit buttons
        var allInputSubmit = document.querySelectorAll('input[type="submit"]');
        for (var i = 0;i < allInputSubmit.length;i++) {
            allInputSubmit[i].className = 'btn btn-sm btn-cambium';
        }
    }
};

/**
 * Extract section and category
 */
CanopyEnhancer.prototype.identifySection = function() {
    var match = window.location.href.match(/catindex\=([0-9]+).*pageindex\=([0-9]+)/);
    if (match != null) {
        if (match[1] && match[2]) {
            this.currentCatIndex = match[1];
            this.currentPageIndex = match[2];
        } else {
            this.currentCatIndex = 0;
            this.currentPageIndex = 1;
        }
    } else {
        this.currentCatIndex = 0;
        this.currentPageIndex = 1;
    }
};

/**
 * Get current category name
 *
 * @returns {*}
 */
CanopyEnhancer.prototype.getCurrentCatName = function() {
    if (this.Sections[this.currentCatIndex]) {
        return this.Sections[this.currentCatIndex].name;
    } else {
        return "Unknown";
    }
};

/**
 * Get current page name
 *
 * @returns {*}
 */
CanopyEnhancer.prototype.getCurrentPageName = function() {
    if (this.Sections[this.currentCatIndex]) {
        if (this.Sections[this.currentCatIndex].pages !== undefined) {
            return this.Sections[this.currentCatIndex].pages[this.currentPageIndex];
        } else {
            return 0;
        }
    } else {
        return "Unknown";
    }
};

/**
 * Get WebPage Auto Update setting
 */
CanopyEnhancer.prototype.getRefreshTime = function() {
    var bodyOnload = document.getElementsByTagName('body')[0].getAttribute('onload');
    var match = bodyOnload.match(/handleLoad\(([0-9]+)\,.*/);
    if (match[1]) {
        this.refreshTime = match[1];
        this.intervalsTimeout = (this.refreshTime * 1000) + 1;
    } else {
        this.refreshTime = 0;
    }
};

/** ======================================================================
 *  =RealTimeTraffic
 ** ======================================================================*/

/**
 * Display realtime traffic
 */
CanopyEnhancer.prototype.realTimeTraffic = function() {
    var _this = this;
    if ((this.currentCatIndex == 2 && this.currentPageIndex == 7) || (this.currentCatIndex == 2 && this.currentPageIndex == 9)) {

        var inTrafficBlock, outTrafficBlock;
        if (this.currentPageIndex == 7) {
            inTrafficBlock = document.getElementById('FecCb_ifmib_ifInOctets');
            outTrafficBlock = document.getElementById('FecCb_ifmib_ifOutOctets');
        } else {
            inTrafficBlock = document.getElementById('RfCb_ifmib_ifInOctets');
            outTrafficBlock = document.getElementById('RfCb_ifmib_ifOutOctets');
        }

        var el = document.createElement("span");
        el.id = 'cge-CurrInTraffic-wrap';
        el.className = 'cge-real-time-throughput cge-color-blue-cambium';
        el.innerHTML = ' (<span id="cge-CurrInTraffic">0.00</span> Mbps)</span>';
        inTrafficBlock.parentNode.insertBefore(el, inTrafficBlock.nextSibling);

        el = document.createElement("span");
        el.id = 'cge-CurrOutTraffic-wrap';
        el.className = 'cge-real-time-throughput cge-color-blue-cambium';
        el.innerHTML = ' (<span id="cge-CurrOutTraffic">0.00</span> Mbps)';
        outTrafficBlock.parentNode.insertBefore(el, outTrafficBlock.nextSibling);

        if ((this.refreshTime > 0)) {

            var prevInTraffic = parseInt(inTrafficBlock.innerText);
            prevInTraffic = prevInTraffic.byte2Mbit();
            prevInTraffic = prevInTraffic.round2();

            var prevOutTraffic = parseInt(outTrafficBlock.innerText);
            prevOutTraffic = prevOutTraffic.byte2Mbit();
            prevOutTraffic = prevOutTraffic.round2();

            setInterval(function () {

                var currInTraffic = parseInt(inTrafficBlock.innerText);
                currInTraffic = currInTraffic.byte2Mbit();
                currInTraffic = currInTraffic.round2();

                var currOutTraffic = parseInt(outTrafficBlock.innerText);
                currOutTraffic = currOutTraffic.byte2Mbit();
                currOutTraffic = currOutTraffic.round2();

                var inTrafficDiff = currInTraffic - prevInTraffic;
                var outTrafficDiff = currOutTraffic - prevOutTraffic;

                if (inTrafficDiff > 0) {
                    document.getElementById('cge-CurrInTraffic').innerHTML = ((inTrafficDiff / _this.refreshTime).round2()).toString();
                }

                if (outTrafficDiff > 0) {
                    document.getElementById('cge-CurrOutTraffic').innerHTML = ((outTrafficDiff / _this.refreshTime).round2()).toString();
                }

                prevInTraffic = currInTraffic;
                prevOutTraffic = currOutTraffic;

            }, this.intervalsTimeout);
        } else {
            document.getElementById('cge-CurrOutTraffic-wrap').innerHTML = ' (Set Webpage Auto Update > 0 for real time throughput)';
            document.getElementById('cge-CurrInTraffic-wrap').innerHTML = ' (Set Webpage Auto Update > 0 for real time throughput)';
        }
    }
};

/** ======================================================================
 *  =APEvaluation
 ** ======================================================================*/

/**
 * Get evaluation Data
 * @returns {boolean}
 */
CanopyEnhancer.prototype.extractAPEvaluationData = function() {
    var rawAPEval = this.apEvaluationBlock.innerHTML;
    var regex = /<br\s*[\/]?>/gi;
    rawAPEval = rawAPEval.replace(regex, " ");
    rawAPEval = rawAPEval.replace(/\&nbsp\;/gi, " ");
    var splittedEval = rawAPEval.split("*********************************************");

    splittedEval[0] = splittedEval[0].replace(/([\n]+)/g, " ");
    splittedEval[0] = splittedEval[0].replace(/([\s]+)/g, " ");

    var tmpFirstRowMatch = splittedEval[0].match(/AP Selection Method used\:(.*)\sCurrent entry index\:/);
    if (tmpFirstRowMatch) {
        this.apSelectionMethod = tmpFirstRowMatch[1];
    }
    tmpFirstRowMatch = splittedEval[0].match(/Current entry index\:\s([0-9]+)\sSession Status\:/);
    if (tmpFirstRowMatch) {
        this.currentEvaluatinEntry = tmpFirstRowMatch[1];
    }
    tmpFirstRowMatch = splittedEval[0].match(/Session Status\:\s([A-Z]+)\s\(/);
    if (tmpFirstRowMatch) {
        this.currentSessionStatus = tmpFirstRowMatch[1];
    }

    if (this.debug === true) {
        console.log("AP Selection Method: " + this.apSelectionMethod);
        console.log("Current eval entry: " + this.currentEvaluatinEntry);
        console.log("Session status: " + this.currentSessionStatus);
    }

    delete(splittedEval[0]);
    for (var i=1;i<splittedEval.length;i++) {
        var index = i - 1;
        var tmpStr = splittedEval[i];
        var tmpObj = {};
        var tmpMatch;
        var tmpRegexp;

        for(var k = 0;k < this.evaluationFields.length;k++) {
            var kplus = k+1;
            var pre_pattern = RegExp.quote(this.evaluationFields[k]);

            if (kplus < this.evaluationFields.length) {
                var post_pattern = RegExp.quote(this.evaluationFields[kplus]);
                if (pre_pattern == 'RegFail') {
                    tmpRegexp = new RegExp(pre_pattern + " ([0-9]+).*" + post_pattern+"\:");
                } else {
                    tmpRegexp = new RegExp(pre_pattern + "\:(.*)" + post_pattern);
                }
                tmpMatch = tmpStr.match(tmpRegexp);
                if (tmpMatch) {
                    tmpObj[pre_pattern] = tmpMatch[1].trimBlank();
                }
            } else {
                tmpRegexp = new RegExp(pre_pattern+"\:(.*)");
                tmpMatch = tmpStr.match(tmpRegexp);
                if (tmpMatch) {
                    tmpObj[pre_pattern] = tmpMatch[1].trimBlank();
                }
            }
        }
        this.APEvaluationObj[index] = tmpObj;
    }
    if (this.APEvaluationObj.length > 0) {
        return true;
    }
    return false;
};

/**
 * Render AP Evaluation data in HTML
 */
CanopyEnhancer.prototype.renderBetterEvaluationTemplate = function() {

    var betterEvalBlock = document.getElementById('betterEvaluation');
    if (typeof(betterEvalBlock) == 'undefined' || betterEvalBlock == null) {
        betterEvalBlock = document.createElement("div");
        betterEvalBlock.id = 'betterEvaluation';
        betterEvalBlock.innerHTML = '';
        this.apEvaluationBlock.parentNode.insertBefore(betterEvalBlock, this.apEvaluationBlock.nextSibling);
    }

    var evaluationContent = '';
    evaluationContent += "<b>AP Selection Method:</b> "+this.apSelectionMethod+' - ';
    evaluationContent += " <b>Current evaluation entry:</b> "+this.currentEvaluatinEntry+' - ';
    evaluationContent += " <b>Session status:</b> "+this.currentSessionStatus;
    evaluationContent += "<hr /><br />";

    for(var i = 0;i<this.APEvaluationObj.length;i++) {
        var evalEntry = this.APEvaluationObj[i];

        var insRow = true;
        var counter = 0;
        evaluationContent += '<div class="cge-ap-evaluation-entry-title">';
        if (i == this.currentEvaluatinEntry) {
            evaluationContent += '<b class="cge-color-blue-cambium">Entry: ' + i + ' - Current AP</b><br />';
        } else {
            evaluationContent += '<b>Entry: ' + i + '</b><br />';
        }
        evaluationContent += '</div>';
        evaluationContent += '<table class="table table-responsive table-striped table-condensed table-bordered cge-ap-evaluation-entry-table"><tbody>';
        for (var prop in evalEntry) {
            if(!evalEntry.hasOwnProperty(prop)) continue;
            counter++;
            if (insRow === true) {
                evaluationContent += '<tr>';
                insRow = false;
            }
            switch (prop) {
                case 'Beacon Receive Power':
                    var tmpres = evalEntry[prop].match(/\-(([0-9]+)\.([0-9]))/);
                    if (tmpres) {
                        var tmpsignal = parseFloat(tmpres[1]);
                        tmpsignal = -tmpsignal;
                        var cellClass = '';
                        if (tmpsignal > -70) {
                            cellClass = 'cge-good-power-level';
                        } else if (tmpsignal <= -70 && tmpsignal > -80) {
                            cellClass = 'cge-decent-power-level';
                        } else {
                            cellClass = 'cge-bad-power-level';
                        }
                        evaluationContent += '<td>'+prop+': <span class="'+cellClass+'">'+evalEntry[prop]+'</span></td>';
                    } else {
                        evaluationContent += '<td>'+prop+': '+evalEntry[prop]+'</td>';
                    }
                    break;
                case 'ESN':
                case 'Color Code':
                    evaluationContent += '<td class="cge-bg-blue-light">'+prop+': '+evalEntry[prop]+'</td>';
                    break;
                default:
                    evaluationContent += '<td>'+prop+': '+evalEntry[prop]+'</td>';
                    break;
            }

            if (counter % 6 === 0) {
                evaluationContent += '</tr>';
                insRow = true;
            }
        }
        if (insRow === true) {
            evaluationContent += '</tr>';
        }

        evaluationContent += '</table></tbody>';
    }

    betterEvalBlock.innerHTML = evaluationContent;
    this.apEvaluationBlock.style.display = 'none';
};

/**
 * Initialize better evaluation
 */
CanopyEnhancer.prototype.betterEvaluation = function() {
    if (this.apEvaluationBlock != null) {
        if (this.extractAPEvaluationData()) {
            if (this.refreshTime > 0) {
                var _this = this;
                _this.renderBetterEvaluationTemplate();
                setInterval(function () {
                    _this.extractAPEvaluationData();
                    _this.renderBetterEvaluationTemplate();
                }, this.intervalsTimeout);
            } else {
                this.renderBetterEvaluationTemplate();
            }
        }
    }
};

/** ======================================================================
 *  =MACLookUp
 ** ======================================================================*/

/**
 * MAC LookUp API
 * @param block
 * @constructor
 */
CanopyEnhancer.prototype.MACLookUp = function(block) {
    var _this = this;
    var blockRect = block.getBoundingClientRect();
    var macaddress = block.innerText.trimBlank();
    block.classList.add('cge-highlight');

    if (macaddress.isMAC()) {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://macvendors.co/api/' + macaddress, true);
        request.onload = function () {
            var attrContent;
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = JSON.parse(request.responseText);
                if (_this.debug === true) {
                    console.log(data);
                }
                if (data.result.error == undefined) {
                    attrContent = "Company: " + data.result.company + "\n\n";
                    attrContent += "MAC Prefix: " + data.result.mac_prefix + "\n\n";
                    attrContent += "Address: " + data.result.address;

                } else {
                    attrContent = "Error, no result";
                }
            } else {
                // Error
                attrContent = "Error, no result";
            }
            _this.tooltipMACNode.innerHTML = attrContent;
            _this.tooltipMACNode.style.display = 'block';
            var tooltipRect = _this.tooltipMACNode.getBoundingClientRect();
            _this.tooltipMACNode.style.top = ( (blockRect.top + document.body.scrollTop) - (tooltipRect.height) - 5) + "px";
            _this.tooltipMACNode.style.left = (blockRect.left - (blockRect.width / 2) + (tooltipRect.width / 2))+ "px";
        };
        request.onerror = function () {};

        request.send();
    } else {
        _this.tooltipMACNode.style.display = 'none';
        block.classList.remove('cge-highlight');

    }
};

/**
 * Initialize listeners
 */
CanopyEnhancer.prototype.addMACLookUpListener = function(querySelector) {
    querySelector = typeof querySelector !== 'undefined' ? querySelector : 'body';
    var _this = this;

    document.querySelector(querySelector).addEventListener('mouseover', function(event) {
        _this.MACLookUp(event.target);
    });

    document.querySelector(querySelector).addEventListener('mouseout', function(event) {
        event.target.classList.remove('cge-highlight');
        _this.tooltipMACNode.style.display = 'none';
    });

    document.querySelector(querySelector).addEventListener('click', function(event) {
        _this.MACLookUp(event.target);
    });
};

/**
 * ARP Page processing
 */
CanopyEnhancer.prototype.ARPPageMacLookup = function() {
    if (this.currentCatIndex == 2 && this.currentPageIndex == 20 && this.settings.cge_mac_lookup == 1) {

        // Tooltip
        this.tooltipMACNode = document.createElement('div');
        this.tooltipMACNode.id = 'cge-mac-lookup-tooltip';
        this.tooltipMACNode.className = 'cge-tooltip';
        document.getElementsByTagName("body")[0].appendChild(this.tooltipMACNode);

        this.addMACLookUpListener('#page');
    }
};

/**
 * Add special tags to all MAC Addresses (not used)
 *
 * @param block_id
 */
CanopyEnhancer.prototype.addTagToMACAddresses = function(block_id) {

    var innerText = document.getElementById(block_id).innerHTML;
    var newText = "";
    var i = -1;
    var lcinnerText = innerText.toLowerCase();

    while (innerText.length > 0) {
        i = lcinnerText.regexIndexOf(/(([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2}))/, i + 1);
        if (i < 0) {
            newText += innerText;
            innerText = "";
        } else {
            // skip anything inside an HTML tag
            if (innerText.lastIndexOf(">", i) >= innerText.lastIndexOf("<", i)) {
                // skip anything inside a <script> block
                if (lcinnerText.lastIndexOf("/script>", i) >= lcinnerText.lastIndexOf("<script", i)) {
                    newText += innerText.substring(0, i);
                    // Start tag
                    newText += '<span class="'+this.MACLookUpClass+'">';
                    // MAC Address
                    newText += innerText.substr(i, 17);
                    // End Tag
                    newText += "</span>";
                    innerText = innerText.substr(i + 17);
                    lcinnerText = innerText.toLowerCase();
                    i = -1;
                }
            }
        }
    }
    document.getElementById(block_id).innerHTML = newText;
};

/** ======================================================================
 *  =NAT Table
 ** ======================================================================*/

/**
 * IP Lookup
 *
 * @param ip
 * @param block
 * @constructor
 */
CanopyEnhancer.prototype.IPLookUp = function(block) {
    var _this = this;
    var blockRect = block.getBoundingClientRect();
    var ip = block.innerText.trimBlank();
    block.classList.add('cge-highlight');
    if (ip.isValidPubIP()) {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://ip-api.com/json/' + ip, true);
        request.onload = function () {
            var attrContent;
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = JSON.parse(request.responseText);
                if (_this.debug === true) {
                    console.log(data);
                }
                if (data.status == 'success') {
                    attrContent = "AS: " + data.as + "<br />";
                    attrContent += "Country: " + data.country + " ("+ data.countryCode +")<br />";
                    attrContent += "Region: " + data.regionName+ "<br />";
                    attrContent += "City: " + data.city+ "<br />";
                    attrContent += "ISP: " + data.isp;

                } else {
                    attrContent = "Error, no result";
                }
            } else {
                // Error
                attrContent = "Error, no result";
            }
            _this.tooltipIPNode.innerHTML = attrContent;
            _this.tooltipIPNode.style.display = 'block';
            var tooltipRect = _this.tooltipIPNode.getBoundingClientRect();
            _this.tooltipIPNode.style.top = ( (blockRect.top + document.body.scrollTop) - (tooltipRect.height) - 5) + "px";
            _this.tooltipIPNode.style.left =  (blockRect.left + (blockRect.width / 2) - (tooltipRect.width / 2))+ "px";

        };
        request.onerror = function () {};
        request.send();
    } else {
        block.classList.remove('cge-highlight');
        _this.tooltipIPNode.style.display = 'none';
    }
};

/**
 * Initialize listeners
 */
CanopyEnhancer.prototype.addIPLookUpListener = function(querySelector) {
    querySelector = typeof querySelector !== 'undefined' ? querySelector : 'body';
    var _this = this;

    document.querySelector(querySelector).addEventListener('mouseover', function(event) {
        _this.IPLookUp(event.target);
    });

    document.querySelector(querySelector).addEventListener('mouseout', function(event) {
        event.target.classList.remove('cge-highlight');
        _this.tooltipIPNode.style.display = 'none';
    });

    document.querySelector(querySelector).addEventListener('click', function(event) {
        _this.IPLookUp(event.target);
    });
};

/**
 * NAT Table
 */
CanopyEnhancer.prototype.NATTable = function() {
    if (this.currentCatIndex == 5 && this.currentPageIndex == 9 && this.settings.cge_ip_lookup == 1) {
        // Tooltip
        this.tooltipIPNode = document.createElement('div');
        this.tooltipIPNode.id = 'cge-ip-lookup-tooltip';
        this.tooltipIPNode.className = 'cge-tooltip';
        document.getElementsByTagName("body")[0].appendChild(this.tooltipIPNode);
        // Listeners
        this.addIPLookUpListener('#page');
    }
};

/**
 * Add special tag to IP Addresses for lookup (not used)
 * @param block_id
 */
CanopyEnhancer.prototype.addTagToIPAddresses = function(block_id) {
    var innerText = document.getElementById(block_id).innerHTML;
    var newText = "";
    var i = -1;
    var lcinnerText = innerText.toLowerCase();

    while (innerText.length > 0) {
        i = lcinnerText.regexIndexOf(/((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))/, i + 1);
        if (i < 0) {
            newText += innerText;
            innerText = "";
        } else {
            // skip anything inside an HTML tag
            if (innerText.lastIndexOf(">", i) >= innerText.lastIndexOf("<", i)) {
                // skip anything inside a <script> block
                if (lcinnerText.lastIndexOf("/script>", i) >= lcinnerText.lastIndexOf("<script", i)) {
                    newText += innerText.substring(0, i);
                    // Start tag
                    newText += '<span class="'+this.IPLookUpClass+'">';
                    // MAC Address
                    newText += innerText.substr(i, 15);
                    // End Tag
                    newText += "</span>";
                    innerText = innerText.substr(i + 15);
                    lcinnerText = innerText.toLowerCase();
                    i = -1;
                }
            }
        }
    }
    document.getElementById(block_id).innerHTML = newText;
};