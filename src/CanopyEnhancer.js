const PLATFORM_MIMO_OFDM = 'MIMO_OFDM';
const PLATFORM_SISO_OFDM = 'SISO_OFDM';
const PLATFORM_FSK = 'FSK';

/**
 * Canopy GUI Enhancer
 * @constructor
 */
var CanopyEnhancer = function() {
    this.browser =  'chrome';
    this.refreshTime = 0;
    this.lastRefresh = 0;
    this.tooltipMACNode = {};
    this.tooltipIPNode = {};

    /**
     * Default settings
     * @type {{cge_enabled: number, cge_custom_css: number, cge_ip_lookup: number, cge_mac_lookup: number, cge_ap_evaluation: number, cge_ap_throughput: number, cge_ap_data_vc: number, cge_rtt_type: string, cge_debug: number}}
     */
    this.settings = {
        cge_enabled: 1,
        cge_custom_css: 1,
        cge_ip_lookup: 1,
        cge_mac_lookup: 1,
        cge_ap_evaluation: 1,
        cge_ap_throughput: 1,
        cge_ap_data_vc: 1,
        cge_rtt_type: 'string',
        cge_rtt_graph_entries: 10,
        cge_debug : 0
    };

    this.intervalsTimeout = 0;
    this.currentCatIndex = -1;
    this.currentPageIndex = -1;
    this.currentRadioMAC = "000000000000";
    this.currentRadioModulation = PLATFORM_MIMO_OFDM;
    this.isMedusa = false;
    this.medusaObserver = null;

    /*
     * =Traffic
     */
    this.mainTrafficBlockID = null;
    this.inTrafficID = null;
    this.outTrafficID = null;
    this.inUcastPktsID = null;
    this.outUcastPktsID = null;
    this.inNUcastPktsID = null;
    this.outNUcastPktsID = null;
    this.realTimeTrafficChart = null;
    this.trafficData = {
        started: false,
        // InOctets
        prevInOctets: 0,
        inTraffic: 0,
        // OutOctets
        prevOutOctets: 0,
        outTraffic: 0,
        // InUcastPkts
        prevInUcastPkts: 0,
        inUcastPps: 0,
        // OutUcastPkts
        prevOutUcastPkts: 0,
        outUcastPps: 0,
        // InNUcastPkts
        prevInNUcastPkts: 0,
        inNUcastPps: 0,
        // OutNUcastPkts
        prevOutNUcastPkts: 0,
        outNUcastPps: 0,
    };

    /**
     * Ethernet interface error IDs
     *
     * @type {[String]}
     */
    this.ethernetErrorsFields = [
        'FecCb_ifmib_ifInErrors',
        'FecCb_ifmib_ifOutErrors',
        'FecCb_fec_crerrs',
        'FecCb_fec_rcvfifonobufs',
        'FecCb_fec_clserrs',
        'FecCb_fec_rlerrs',
        'FecCb_fec_unerrs',
        'FecCb_fec_cslerrs',
        'FecCb_fec_nocs',
        'FecCb_fec_lgerrs',
        'FecCb_fec_sherrs',
        'FecCb_fec_excdef'
    ];

    /**
     * Radio interface errors IDs
     *
     * @type {[String]}
     */
    this.radioErrorsFields = [
        'RfCb_ifmib_ifInDiscards',
        'RfCb_ifmib_ifInErrors',
        'RfCb_ifmib_ifInUnknownProtos',
        'RfCb_ifmib_ifOutDiscards',
        'RfCb_ifmib_ifOutErrors',
        'SoundingStats_ResponsesSuppressed',
        'SoundingStats_ErrorCount',
        'SoundingStats_VersionMismatch'
    ];

    /*
     * =AP_Evaluation
     */
    this.apEvaluationBlock = document.getElementById('APEval'); // #APEval
    this.APEvaluationObj = [];
    this.apSelectionMethod = "";
    this.currentEvaluatinEntry = -1;
    this.currentSessionStatus = "";
    this.currentlyScanning = "";

    /*
     * =AP SM Throughput
     */
    this.APThroughputSM = {};

    /*
     * =Sections
     */
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
            11: "Data VC",
            12: "Throughput",
            15: "NAT Stats",
            16: "NAT DHCP",
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

    this.APEvaluationFields = {
        MIMO_OFDM: [
            'Index',
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
        ],
        SISO_OFDM: [
            'Index',
            'Frequency',
            'Channel Bandwidth',
            'Cyclic Prefix',
            'ESN',
            'Region',
            'Beacon Receive Power Level',
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
        ],
        FSK: [
            'Index',
            'Frequency',
            'ESN',
            'Region',
            'Jitter',
            'Beacon Receive Power Level',
            'Beacon Count',
            'BRcvW',
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
            'VCRsvFail',
            'VCActFail',
            'AP Gain',
            'AP RcvT:',
            'FrameNumber',
            'SectorID',
            'Color Code',
            'BeaconVersion',
            'SectorUserCount',
            'NumULHalfSlots',
            'NumDLHalfSlots',
            'NumULContSlots',
            'WhiteSched',
            'Authentication',
            'SM PPPoE',
            'Frame Period'
        ]
    };

    this.eventLogErrorStrings = [
        'FatalError()',
        'Watchdog Reset',
        'ADI Communication Failure',
        'ADI forced reset has been invoked!'
    ];

    this.soundingStatsFields = [
        'VC',
        'reference SF:',
        'soundingState',
        'soundingFault',
        'mumimoVetoCount',
        'channelDistortion',
        'nullingSNR',
        'cnResponseCountSM',
        'cnResponseCountAP',
        'missedTagCount'
    ];
};

/**
 * Initialize CanopyEnhancer
 */
CanopyEnhancer.prototype.initialize = function() {
    this.browser = (function(){
        let M = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (typeof M[1] === undefined) {
            return 'chrome';
        }
        return M[1].toLowerCase();
    })();

    this.getRadioMac();
    if (this.currentRadioMAC !== '000000000000') {
        clearInterval(document.ajaxtimerid);

        this.loadSettings();

        if (this.debugMessages() === true) {
            console.log("Browser platform: "+this.browser);
        }

        let page = document.getElementById("page");
        let title = page.querySelector("h2");
        if (title !== null) {
            let titleString = title.textContent;
            let deviceType = null;
            let resDevType = titleString.match(/.*(?:GHz|MHz)(?:\sAdjustable\sPower)?\s\-\s([a-zA-Z\-\s]+)\s\-\s([A-Fa-f0-9\-]{17})/);

            if (resDevType !== null) {
                deviceType = resDevType[1];
                this.currentRadioModulation = PLATFORM_FSK;
            } else {
                resDevType = titleString.match(/.*(?:GHz|MHz)\sSISO\sOFDM\s\-\s([a-zA-Z\-\s]+)\s\-\s([A-Fa-f0-9\-]{17})/);
                if (resDevType !== null) {
                    deviceType = resDevType[1];
                    this.currentRadioModulation = PLATFORM_SISO_OFDM;
                } else {
                    resDevType = titleString.match(/.*(?:GHz|MHz)\s(MU\-)?MIMO(?:\sOFDM)?\s\-\s([a-zA-Z\-\s]+)(?:\s\-\s|\n)([A-Fa-f0-9\-]{17})/);
                    if (resDevType) {
                        deviceType = resDevType[2];
                        if (resDevType[1]) {
                            this.isMedusa = true;
                        }
                    }
                }
            }

            if (deviceType !== null) {
                this.getDevType(deviceType);
            } else {
                this.currentRadioType = "SM";
            }
        } else {
            if (this.debugMessages() === true) {
                console.log("Title not found");
            }
        }

        if (this.debugMessages() === true) {
            console.log("Current radio Modulation: " + this.currentRadioModulation);
            console.log("Current radio Type: " + this.currentRadioType);
        }

        this.identifySection();
        this.getRefreshTime();

        // Site name in title
        let strongSiteName = document.createElement('strong');
        strongSiteName.className = 'cge-color-blue-cambium';
        strongSiteName.appendChild(document.createTextNode(this.getSiteNameTitle()+': '));

        document.querySelector('#page > h1').insertBefore(
            strongSiteName,
            document.querySelector('#page > h1').firstChild
        );

        if (this.debugMessages() === true) {
            console.log("CGE Enabled!");
            console.log("Current radio MAC " + this.currentRadioMAC);
            console.log("Current Section Category: " + this.getCurrentCatName()+" ("+this.currentCatIndex+")");
            console.log("Current Section Page: " + this.getCurrentPageName()+" ("+this.currentPageIndex+")");
        }

        this.enhancedCSS();
        this.homePageRender();
        this.realTimeTraffic();
        this.betterEvaluation();
        this.MacLookupPage();
        this.NATTable();
        this.APThroughput();
        this.dataVC();
        this.EventLog();
        this.sessionStatus();
        this.SetUpAJAX();
    }
};

CanopyEnhancer.prototype.getSiteNameTitle = function() {
    let title = document.getElementsByTagName('title')[0].textContent;
    let match = title.match(/(.*)\s\-\s(?:[a-zA-Z0-9\s]+)\[(?:.*)\]/);
    if (match) {
        return match[1];
    }
    return '';
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

/**
 * Device type
 *
 * @param string
 */
CanopyEnhancer.prototype.getDevType = function(string) {
    if (string === "Subscriber Module") {
        this.currentRadioType = "SM";
    } else if (string === "Access Point") {
        this.currentRadioType = "AP";
    } else {
        this.currentRadioType = "BH";
    }
};

/**
 * SetUpAJAX
 */
CanopyEnhancer.prototype.SetUpAJAX = function() {

    if (this.refreshTime > 0) {
        let _this = this;

        function CGESetUpAJAX() {
            if (typeof document.ajaxtimerid !== "undefined") {
                clearInterval(document.ajaxtimerid);
            }
            let request = document.request;
            if (typeof request === 'undefined' || (request.readyState > 0 && request.readyState < 4)) {
                return;
            }
            let vars = [];
            let sections = getElementsByClassName(document, 'table', 'section');
            for (let j = 0; j < sections.length; j++) {
                if (!sections[j].style.display || sections[j].style.display !== "none") {
                    vars = vars.concat(getElementsByClassName(sections[j], 'span', 'var'));
                }
            }
            let params = location.search.substr(1);
            for (let i = 0; i < vars.length; i++) {
                params += '&' + vars[i].id + '=' + GetVarRefreshOption(vars[i].id);
            }
            params += '&' + RebootClass + '= ';
            request.open("POST", "query.cgi", true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send(params);
            request.onreadystatechange = function () {
                let request = document.request;
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        if (request.responseXML) {

                            let vars = request.responseXML.getElementsByTagName('var');
                            for (let i = 0; i < vars.length; i++) {
                                let id = vars[i].getAttribute('id');
                                if (id !== RebootClass) {
                                    let htmlCode = '';
                                    if (vars[i].hasChildNodes())
                                        htmlCode = vars[i].firstChild.nodeValue;
                                    id = PerformRefreshOverride(id, htmlCode);
                                    if (id) {
                                        let parent = document.getElementById(id);
                                        if (parent) {
                                            parent.emptyElement();
                                            parent.insertAdjacentHTML('afterbegin', htmlCode);
                                            if (document.createEvent) {
                                                let event = document.createEvent("Event");
                                                event.initEvent("change", true, true);
                                                parent.dispatchEvent(event);
                                            } else if (document.createEventObject) {
                                                let evObj = document.createEventObject();
                                                parent.fireEvent("onclick", evObj);
                                            }
                                        }
                                    }
                                } else {
                                    let rebootBoxes = getElementsByClassName(document, 'span', RebootClass);
                                    for (let j = 0; j < rebootBoxes.length; j++) {
                                        if (vars[i].hasChildNodes() && vars[i].firstChild.nodeValue) {
                                            rebootBoxes[j].emptyElement();
                                            rebootBoxes[j].insertAdjacentHTML('afterbegin', vars[i].firstChild.nodeValue);
                                        } else {
                                            if (rebootBoxes[j].hasChildNodes()) {
                                                while (rebootBoxes[j].lastChild) {
                                                    rebootBoxes[j].removeChild(rebootBoxes[j].lastChild);
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            if (_this.isTrafficPage()) {
                                _this.updateTrafficData(
                                    request.responseXML.getElementById(_this.inTrafficID).firstChild.nodeValue,
                                    request.responseXML.getElementById(_this.outTrafficID).firstChild.nodeValue,
                                    request.responseXML.getElementById(_this.inUcastPktsID).firstChild.nodeValue,
                                    request.responseXML.getElementById(_this.outUcastPktsID).firstChild.nodeValue,
                                    request.responseXML.getElementById(_this.inNUcastPktsID).firstChild.nodeValue,
                                    request.responseXML.getElementById(_this.outNUcastPktsID).firstChild.nodeValue,
                                );
                            }

                            _this.homePageRender();
                            _this.APThroughputCalc();
                            _this.dataVCCalc();
                            _this.sessionStatus();
                            _this.lastRefresh = Date.now();
                        }
                    } else if (request.status === 401) {
                        clearInterval(document.cge_ajaxtimerid);
                        if (!document.rebootId)
                            window.location.reload();
                    }
                }
            };
        }

        CGESetUpAJAX();
        document.cge_ajaxtimerid = setInterval(CGESetUpAJAX, (this.refreshTime * 1000));
    }
};

/**
 * Get Radio MAC Address
 * @returns {boolean}
 */
CanopyEnhancer.prototype.getRadioMac = function() {
    let styleSheetHref = document.getElementsByTagName('link')[0].getAttribute('href');
    let res = styleSheetHref.match(/\_canopy\.css\?mac_esn\=([A-Fa-f0-9]{12})/);
    if (res !== null) {
        this.currentRadioMAC = res[1].toUpperCase();
    } else {
        this.currentRadioMAC = '000000000000';
    }
};

/**
 * Load settings
 */
CanopyEnhancer.prototype.loadSettings = function() {
    let _this = this;
    try {
        let settings = JSON.parse(document.CGESettings);
        for (let key in settings) {
            if (!settings.hasOwnProperty(key)) continue;
            _this.settings[key] = settings[key];
        }
    } catch(e) {
        console.error(e);
    }
};

/**
 * Debug enabled?
 * @returns {boolean}
 */
CanopyEnhancer.prototype.debugMessages = function() {
    return (this.settings.cge_debug === 1);
};

/**
 * Add Custom CSS
 */
CanopyEnhancer.prototype.enhancedCSS = function() {
    if (this.settings.cge_custom_css === 1) {
        // Change submit buttons
        let allInputSubmit = document.querySelectorAll('input[type="submit"]');
        for (let i = 0;i < allInputSubmit.length;i++) {
            allInputSubmit[i].className = 'btn btn-sm btn-cambium';
        }
        if (document.getElementById('loginbutton')) {
            document.getElementById('loginbutton').className = 'btn btn-sm btn-default';
        }
    }
};

/**
 * Extract section and category
 */
CanopyEnhancer.prototype.identifySection = function() {
    let match = window.location.href.match(/catindex\=([0-9]+).*pageindex\=([0-9]+)/);
    if (match != null) {
        if (match[1] && match[2]) {
            this.currentCatIndex = Number(match[1]);
            this.currentPageIndex = Number(match[2]);
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
 * CSS class based on signal power
 * @param signal
 * @returns {*}
 */
CanopyEnhancer.prototype.getSignalPowerClass = function(signal) {
    var cellClass;
    if (signal > -70) {
        cellClass = 'cge-good-power-level';
    } else if (signal <= -70 && signal > -80) {
        cellClass = 'cge-decent-power-level';
    } else {
        cellClass = 'cge-bad-power-level';
    }
    return cellClass;
};

/**
 * CSS class based on SNR
 * @param h
 * @param v
 * @returns {*}
 */
CanopyEnhancer.prototype.getSNRClass = function(v, h) {
    var cellClass;

    v = Number(v);
    h = Number(h);

    if (h > 0 && v > 0) {
        var sumratio = (v + h) / 2;
        if (sumratio > 24) {
            cellClass = 'cge-good-power-level';
        } else if (sumratio <= 24 && sumratio > 12) {
            cellClass = 'cge-decent-power-level';
        } else {
            cellClass = 'cge-bad-power-level';
        }
    } else {
        cellClass = 'cge-bad-power-level';
    }

    return cellClass;
};

/**
 * CSS class based on adaptRate value
 * @param adaptRate
 * @param modulation
 * @returns {String}
 */
CanopyEnhancer.prototype.getAdaptRateClass = function(adaptRate, modulation) {

    adaptRate = Number(adaptRate);

    switch (modulation) {
        case 'MIMO-A':
        case 'SISO':
            if (adaptRate === 1) {
                return 'cge-poorlink-text'
            }
            if (adaptRate === 2) {
                return 'cge-avglink-text';
            }
            if (adaptRate === 3) {
                return 'cge-betterlink-text';
            }
            if (adaptRate === 4) {
                return 'cge-bestlink-text';
            }
            break;
        case 'MIMO-B':
            if (adaptRate <= 2) {
                return 'cge-poorlink-text'
            }
            if (adaptRate <= 4) {
                return 'cge-avglink-text';
            }
            if (adaptRate <= 6) {
                return 'cge-betterlink-text';
            }
            if (adaptRate = 8) {
                return 'cge-bestlink-text';
            }
            break;
    }
    return '';
};

/* ======================================================================
 *  =Homepage
 * ======================================================================*/

/**
 * E' la homepage?
 * @returns {boolean}
 */
CanopyEnhancer.prototype.ishomePage = function() {
    return (this.currentCatIndex === 0 && this.currentPageIndex === 1);
};

/**
 * Home render
 */
CanopyEnhancer.prototype.homePageRender = function () {

    if (this.ishomePage()) {

        var linkStatusBlock = null;
        if (document.getElementById("LinkStatus") !== null) {
            linkStatusBlock = document.getElementById("LinkStatus");
        } else {
            linkStatusBlock = document.getElementById("LinkStatusMain");
        }

        var linkStatus = linkStatusBlock.textContent;
        if (linkStatus !== '100Base-TX Full Duplex' && linkStatus !== '1000Base-T Full Duplex') {

            var spanEthWarn = document.createElement('span');
            spanEthWarn.className = 'cge-warning';
            spanEthWarn.appendChild(document.createTextNode(linkStatusBlock.textContent));

            linkStatusBlock.emptyElement();
            linkStatusBlock.appendChild(spanEthWarn);
        }

        var distanceBlock = document.getElementById('Distance');
        if (distanceBlock !== null) {
            var milesRegex = distanceBlock.textContent.match(/(([0-9]{1,2})\.([0-9]{0,3}))\smiles/);
            if (milesRegex !== null) {
                var km = parseFloat(milesRegex[1]) * 1.60934;
                distanceBlock.appendChild(document.createTextNode(' - ' + km.toFixed(3) + ' kilometres'));
            }
        }

        switch (this.currentRadioModulation) {
            case 'MIMO_OFDM':
                var span;
                var PowerLevelOFDM = document.getElementById('PowerLevelOFDM');
                if (PowerLevelOFDM !== null) {
                    var signal = PowerLevelOFDM.textContent;
                    signal = parseFloat(signal.replace(" dBm", ""));

                    PowerLevelOFDM.emptyElement();
                    span = document.createElement('span');
                    span.className = this.getSignalPowerClass(signal);
                    span.appendChild(document.createTextNode(signal + ' dBm'));
                    PowerLevelOFDM.appendChild(span);

                }

                var SignalToNoiseRatioSM = document.getElementById('SignalToNoiseRatioSM');
                if (SignalToNoiseRatioSM !== null) {
                    var CSSClass = "";
                    var SNRText = SignalToNoiseRatioSM.textContent;
                    var matchSNR = SNRText.match(/([\d]+)\sV\s\/\s([\d]+)\sH\sdB/);

                    if (matchSNR) {
                        CSSClass = this.getSNRClass(matchSNR[1], matchSNR[2]);
                    } else {
                        matchSNR = SNRText.match(/([\d]+)\sdB\sMIMO\-(?:[A-B])/);
                        if (matchSNR) {
                            CSSClass = this.getSNRClass(matchSNR[1], 0);
                        }
                    }

                    if (CSSClass !== "") {
                        SignalToNoiseRatioSM.emptyElement();
                        span = document.createElement('span');
                        span.className = CSSClass;
                        span.appendChild(document.createTextNode(SNRText));
                        SignalToNoiseRatioSM.appendChild(span);
                    }

                }

                var SessionRate = document.getElementById('SesRate');
                if (SessionRate) {
                    var match = SessionRate.textContent.match(/VC\s{1,2}(?:[\d]{1,3})\sRate\s(?:\d)X\/(\d)X\s((?:MIMO|SISO)\-?(?:[A-B]))/i);
                    if (match) {
                        SessionRate.emptyElement();
                        span = document.createElement('span');
                        span.className = this.getAdaptRateClass(match[1], match[2]);
                        span.appendChild(document.createTextNode(match[0]));
                        SessionRate.appendChild(span);
                    }
                }

                break;
        }

        // Move site info box
        var content = document.getElementById('SectionSiteInfoStats');
        var parent = content.parentNode;
        parent.insertBefore(content, document.getElementById('SectionDeviceInfo'));
    }
};

/* ======================================================================
 *  =RealTimeTraffic
 * ======================================================================*/

/**
 * Is the page Statistics -> Radio?
 * @returns {boolean}
 */
CanopyEnhancer.prototype.isEthernetStats = function() {
    return (this.currentCatIndex === 2 && this.currentPageIndex === 7);
};

/**
 * Is the page Statistics -> Radio?
 * @returns {boolean}
 */
CanopyEnhancer.prototype.isRadioStats = function() {
    return (this.currentCatIndex === 2 && this.currentPageIndex === 9);
};

/**
 * Is radio traffic page? statistics -> ethernet/radio
 * @returns {boolean}
 */
CanopyEnhancer.prototype.isTrafficPage = function() {
    return ( this.isEthernetStats() || this.isRadioStats() );
};

/**
 * Display realtime traffic
 */
CanopyEnhancer.prototype.realTimeTraffic = function() {
    var _this = this;
    if (_this.isTrafficPage()) {
        var sectionTitle = this.Sections[this.currentCatIndex].pages[this.currentPageIndex];

        // TODO: refactor this section
        if (this.currentPageIndex === 7) {
            this.mainTrafficBlockID = document.getElementById('SectionEthernet');
            // Octets
            this.inTrafficID = 'FecCb_ifmib_ifInOctets';
            this.outTrafficID = 'FecCb_ifmib_ifOutOctets';
            // UcastPkts
            this.inUcastPktsID = 'FecCb_ifmib_ifInUcastPkts';
            this.outUcastPktsID = 'FecCb_ifmib_ifOutUcastPkts';
            // NUcastPkts
            this.inNUcastPktsID = 'FecCb_ifmib_ifInNUcastPkts';
            this.outNUcastPktsID = 'FecCb_ifmib_ifOutNUcastPkts';
        } else {
            this.mainTrafficBlockID = document.getElementById('SectionRFCBStat');
            // Octets
            this.inTrafficID = 'RfCb_ifmib_ifInOctets';
            this.outTrafficID = 'RfCb_ifmib_ifOutOctets';
            // UcastPkts
            this.inUcastPktsID = 'RfCb_ifmib_ifInUcastPkts';
            this.outUcastPktsID = 'RfCb_ifmib_ifOutUcastPkts';
            // NUcastPkts
            this.inNUcastPktsID = 'RfCb_ifmib_ifInNUcastPkts';
            this.outNUcastPktsID = 'RfCb_ifmib_ifOutNUcastPkts';
        }

        if ((this.refreshTime > 0)) {

            // Spawn graph block
            if (this.settings.cge_rtt_type === 'graph') {

                this.mainTrafficBlockID.insertAdjacentHTML(
                    'beforebegin',
                    '<div class="section" id="SectionRTGTraffic">' +
                    '<h2 class="sectiontitle"><span class="sectiontitletext">'+sectionTitle+' Real Time Traffic</span><span class="MenuBar" style="float: right;"><img class="MenuImg" src="_min.gif?mac_esn=' + this.currentRadioMAC.toLocaleLowerCase() + '" style="cursor: pointer; margin-right: 5px;"></span></h2>' +
                    '<div id="RTGWrapper"><canvas id="RTGChart" width="1280" height="270"></canvas><div id="RTGLegend"></div></div>' +
                    '</div>'
                );

                var date = new Date;

                var i = 4;
                var timeLabels = [];
                while (i >= 0) {
                    var tmpTime = new Date(date - ( (this.refreshTime * i) * 1000));
                    var timestring = tmpTime.getHours().leadingZero() + ':'+tmpTime.getMinutes().leadingZero()+':'+tmpTime.getSeconds().leadingZero();
                    timeLabels.push(timestring);
                    i--;
                }

                var trDataSetColors, scaleGridLineColor;
                switch (this.settings.cge_theme) {
                    case 'dark':
                        scaleGridLineColor = "rgba(200,200,200,.05)";
                        trDataSetColors = {
                            'trIn': {
                                fillColor: "rgba(138, 118, 170, 0.2)",
                                strokeColor: "rgba(138, 118, 170, 1)",
                                pointColor: "rgba(138, 118, 170, 0.2)",
                                pointHighlightStroke: "rgba(138, 118, 170, 1)"
                            },
                            'trOut': {
                                fillColor: "rgba(35, 216, 127, 0.2)",
                                strokeColor: "rgba(35, 216, 127, 1)",
                                pointColor: "rgba(35, 216, 127, 1)",
                                pointHighlightStroke: "rgba(35, 216, 127, 1)"
                            }
                        };
                        break;
                    default:
                        scaleGridLineColor = "rgba(0,0,0,.05)";
                        trDataSetColors = {
                            'trIn': {
                                fillColor: "rgba(88,88,88,0.2)",
                                strokeColor: "rgba(88,88,88,1)",
                                pointColor: "rgba(88,88,88,0.2)",
                                pointHighlightStroke: "rgba(88,88,88,1)"
                            },
                            'trOut': {
                                fillColor: "rgba(50,143,191,0.2)",
                                strokeColor: "rgba(50,143,191,1)",
                                pointColor: "rgba(50,143,191,1)",
                                pointHighlightStroke: "rgba(50,143,191,1)"
                            }
                        };
                        break;
                }

                let chartData = {
                    labels: timeLabels,
                    datasets: [
                        {
                            label: "Interface Traffic In",
                            fillColor: trDataSetColors.trIn.fillColor,
                            strokeColor: trDataSetColors.trIn.strokeColor,
                            pointColor: trDataSetColors.trIn.pointColor,
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: trDataSetColors.trIn.pointHighlightStroke,
                            data: [0, 0, 0, 0, 0]
                        },
                        {
                            label: "Interface Traffic Out",
                            fillColor: trDataSetColors.trOut.fillColor,
                            strokeColor: trDataSetColors.trOut.strokeColor,
                            pointColor: trDataSetColors.trOut.pointColor,
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: trDataSetColors.trOut.pointHighlightStroke,
                            data: [0, 0, 0, 0, 0]
                        }
                    ]
                };

                let chartOpt = {

                    animation: true,
                    animationSteps: 20,
                    scaleBeginAtZero: true,
                    responsive: true,

                    ///Boolean - Whether grid lines are shown across the chart
                    scaleShowGridLines : true,

                    //String - Colour of the grid lines
                    scaleGridLineColor : scaleGridLineColor,

                    //Number - Width of the grid lines
                    scaleGridLineWidth : 1,

                    //Boolean - Whether to show horizontal lines (except X axis)
                    scaleShowHorizontalLines: true,

                    //Boolean - Whether to show vertical lines (except Y axis)
                    scaleShowVerticalLines: true,

                    //Boolean - Whether the line is curved between points
                    bezierCurve : true,

                    //Number - Tension of the bezier curve between points
                    bezierCurveTension : 0.4,

                    //Boolean - Whether to show a dot for each point
                    pointDot : true,

                    //Number - Radius of each point dot in pixels
                    pointDotRadius : 4,

                    //Number - Pixel width of point dot stroke
                    pointDotStrokeWidth : 1,

                    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                    pointHitDetectionRadius : 20,

                    //Boolean - Whether to show a stroke for datasets
                    datasetStroke : true,

                    //Number - Pixel width of dataset stroke
                    datasetStrokeWidth : 2,

                    //Boolean - Whether to fill the dataset with a colour
                    datasetFill : true,

                    //String - A legend template
                    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"cge-graph-legend-entry\" style=\"background-color:<%=datasets[i].strokeColor%>;\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%>: <span style=\"color:<%=datasets[i].strokeColor%>\"><span id=\"legend-<%=datasets[i].label.replace(/\\s/g, '')%>\">0.00</span> Mbps</span></li><%}%></ul>"

                };

                let ctx = document.getElementById("RTGChart").getContext("2d");
                this.realTimeTrafficChart = new Chart(ctx).Line(chartData, chartOpt);
                document.getElementById('RTGLegend').emptyElement();
                document.getElementById('RTGLegend').insertAdjacentHTML('afterbegin', this.realTimeTrafficChart.generateLegend())

            } else {

                let el = document.createElement("span");
                el.id = 'cge-CurrInTraffic-wrap';
                el.className = 'cge-real-time-throughput cge-color-blue-cambium';
                el.insertAdjacentHTML('afterbegin', ' (<span id="cge-CurrInTraffic">0.00</span> Mbps)</span>');
                document.getElementById(this.inTrafficID).parentNode.insertBefore(
                    el,
                    document.getElementById(this.inTrafficID).nextSibling
                );

                el = document.createElement("span");
                el.id = 'cge-CurrOutTraffic-wrap';
                el.className = 'cge-real-time-throughput cge-color-blue-cambium';
                el.insertAdjacentHTML('afterbegin', ' (<span id="cge-CurrOutTraffic">0.00</span> Mbps)');
                document.getElementById(this.outTrafficID).parentNode.insertBefore(
                    el,
                    document.getElementById(this.outTrafficID).nextSibling
                );
            }

            // TODO: refactor
            let pktsBlocks = [
                this.inUcastPktsID,
                this.outUcastPktsID,
                this.inNUcastPktsID,
                this.outNUcastPktsID
            ];

            // PPs stats
            for (let i = 0; i < pktsBlocks.length; i++) {
                let el = document.createElement("span");
                el.id = 'cge-CurrInTraffic-wrap';
                el.className = 'cge-real-time-throughput cge-color-blue-cambium';
                el.insertAdjacentHTML('afterbegin', ' (<span id="cge-'+pktsBlocks[i]+'">0</span> pps)</span>');
                document.getElementById(pktsBlocks[i]).parentNode.insertBefore(
                    el,
                    document.getElementById(pktsBlocks[i]).nextSibling
                );
            }

        } else {
            this.mainTrafficBlockID.insertAdjacentHTML(
                'beforebegin',
                '<div class="cge-error">Set Webpage Auto Update > 0 for real time throughput (Configuration => General)</div>'
            );
        }

        // Medusa sounding stats
        if (this.isMedusa === true && this.isRadioStats()) {
            this.renderSoundingStats();
        }

        // Error highlight
        this.highlightInterfaceErrors();
    }
};

/**
 * Value per second calculation
 * @param current
 * @param previous
 * @returns Number
 */
CanopyEnhancer.prototype.calcPerSeconds = function(current, previous) {
    return ((current - previous) / this.refreshTime);
};

/**
 * Updates traffic data from webpage
 */
CanopyEnhancer.prototype.updateTrafficData = function (
    currInOctets,
    currOutOctets,
    currInUcastPkts,
    currOutUcastPkts,
    currInNUcastPkts,
    currOutNUcastPkts
) {
    currInOctets = parseInt(currInOctets);
    currOutOctets = parseInt(currOutOctets);
    currInUcastPkts = parseInt(currInUcastPkts);
    currOutUcastPkts = parseInt(currOutUcastPkts);
    currInNUcastPkts = parseInt(currInNUcastPkts);
    currOutNUcastPkts = parseInt(currOutNUcastPkts);

    if (this.trafficData.started) {

        this.trafficData.inTraffic = this.calcPerSeconds(currInOctets, this.trafficData.prevInOctets).byte2Mbit().round2();
        this.trafficData.outTraffic = this.calcPerSeconds(currOutOctets, this.trafficData.prevOutOctets).byte2Mbit().round2();
        this.trafficData.inUcastPps = Math.round(this.calcPerSeconds(currInUcastPkts, this.trafficData.prevInUcastPkts));
        this.trafficData.outUcastPps = Math.round(this.calcPerSeconds(currOutUcastPkts, this.trafficData.prevOutUcastPkts));
        this.trafficData.inNUcastPps = Math.round(this.calcPerSeconds(currInNUcastPkts, this.trafficData.prevInNUcastPkts));
        this.trafficData.outNUcastPps = Math.round(this.calcPerSeconds(currOutNUcastPkts, this.trafficData.prevOutNUcastPkts));

        this.trafficData.prevInOctets = currInOctets;
        this.trafficData.prevOutOctets = currOutOctets;
        this.trafficData.prevInUcastPkts = currInUcastPkts;
        this.trafficData.prevOutUcastPkts = currOutUcastPkts;
        this.trafficData.prevInNUcastPkts = currInNUcastPkts;
        this.trafficData.prevOutNUcastPkts = currOutNUcastPkts;

        /*
         * UPDATE GUI
         */
        if (this.settings.cge_rtt_type === 'graph') {
            let tmpTime = new Date();
            let timestring = tmpTime.getHours().leadingZero() + ':'+tmpTime.getMinutes().leadingZero()+':'+tmpTime.getSeconds().leadingZero();

            this.realTimeTrafficChart.addData(
                [this.trafficData.inTraffic, this.trafficData.outTraffic],
                timestring
            );

            if (this.realTimeTrafficChart.datasets[0].points.length > this.settings.cge_rtt_graph_entries) {
                this.realTimeTrafficChart.removeData();
            }

            document.getElementById('legend-InterfaceTrafficIn').textContent = this.trafficData.inTraffic.toString();
            document.getElementById('legend-InterfaceTrafficOut').textContent = this.trafficData.outTraffic.toString();
        } else {
            document.getElementById('cge-CurrInTraffic').textContent = this.trafficData.inTraffic.toString();
            document.getElementById('cge-CurrOutTraffic').textContent = this.trafficData.outTraffic.toString();
        }

        document.getElementById('cge-'+this.inUcastPktsID).textContent = this.trafficData.inUcastPps.toString();
        document.getElementById('cge-'+this.outUcastPktsID).textContent = this.trafficData.outUcastPps.toString();
        document.getElementById('cge-'+this.inNUcastPktsID).textContent = this.trafficData.inNUcastPps.toString();
        document.getElementById('cge-'+this.outNUcastPktsID).textContent = this.trafficData.outNUcastPps.toString();

    } else {
        this.trafficData.prevInOctets = currInOctets;
        this.trafficData.inTraffic = 0;

        this.trafficData.prevOutOctets = currOutOctets;
        this.trafficData.outTraffic = 0;

        this.trafficData.prevInUcastPkts = currInUcastPkts;
        this.trafficData.inUcastPps = 0;

        this.trafficData.prevOutUcastPkts = currOutUcastPkts;
        this.trafficData.outUcastPps = 0;

        this.trafficData.prevInNUcastPkts = currInNUcastPkts;
        this.trafficData.inNUcastPps = 0;

        this.trafficData.prevOutNUcastPkts = currOutNUcastPkts;
        this.trafficData.outNUcastPps = 0;

        this.trafficData.started = true;
    }

    this.highlightInterfaceErrors();
};

/**
 * Interface error highlight
 */
CanopyEnhancer.prototype.highlightInterfaceErrors = function () {

    var errorClassName = "cge-error-text";
    var errorFields = [];

    if (this.isEthernetStats()) {
        errorFields = this.ethernetErrorsFields;
    } else if (this.isRadioStats()) {
        errorFields = this.radioErrorsFields;
    }

    if (errorFields.length > 0) {

        for (var i = 0; i < errorFields.length; i++) {

            var el = document.getElementById(errorFields[i]);
            if (!el) {
                continue;
            }

            var value = Number(el.textContent);
            if (value > 0) {
                // Add highlight to the counter
                el.parentNode.parentNode.parentNode.classList.add(errorClassName);
                el.parentNode.parentNode.parentNode.classList.add("bold");
            } else {
                // Remove error highlight if it was previously added
                el.parentNode.parentNode.parentNode.classList.remove(errorClassName);
                el.parentNode.parentNode.parentNode.classList.remove("bold");
            }
        }
    }

};

/* ======================================================================
 *  =SoundingStats
 * ======================================================================*/

/**
 * Replace commas with pipe
 *
 * @param text
 * @returns {*}
 */
CanopyEnhancer.prototype.replaceSoundingCommas = function(text) {
    for (let i = 0; i < this.soundingStatsFields.length; i++) {
        let regExpTmp = new RegExp(',\\s+'+RegExp.quote(this.soundingStatsFields[i]));
        text = text.replace(regExpTmp, "|"+this.soundingStatsFields[i]);
    }
    return text;
};

/**
 * Remove headers from rows
 * @param text
 * @returns {*}
 */
CanopyEnhancer.prototype.removeSoundingHeaders = function(text) {
    for (let i = 0; i < this.soundingStatsFields.length; i++) {
        text = text.replace(this.soundingStatsFields[i], "");
    }
    return text;
};

/**
 * Table rendering
 */
CanopyEnhancer.prototype.renderSoundingStats = function() {
    let _this = this;
    let soundingStatsBlock = document.getElementById('SectionSoundingStatistics');
    let soundingStatsLog = document.getElementById('SoundingStatsLog');
    let soundingStatsTable = document.querySelector('#SectionSoundingStatistics table.section');

    if (soundingStatsLog) {

        // create an observer instance
        this.medusaObserver = new MutationObserver(function (mutations) {
            if (mutations && mutations.length > 0) {

                let rawLog = soundingStatsLog.innerHTML;
                let tbodyImprovedTable = document.getElementById('cge-sounding-tbody');
                if (!tbodyImprovedTable) {
                    // Create the table
                    let soundingTable = '';
                    soundingTable += '<table class="table section">';
                    soundingTable += '<thead>';
                    soundingTable += '<tr>';
                    for (let i = 0; i < _this.soundingStatsFields.length; i++) {
                        soundingTable += '<td>' + _this.soundingStatsFields[i].replace(':', '') + '</td>';
                    }
                    soundingTable += '</thead>';
                    soundingTable += '</tr>';

                    soundingTable += '<tbody id="cge-sounding-tbody">';
                    soundingTable += '</tbody>';
                    soundingTable += '</table>';

                    // Insert the table before sounding sections begin
                    soundingStatsTable.insertAdjacentHTML('beforebegin', soundingTable);

                    // Get tbody element
                    tbodyImprovedTable = document.getElementById('cge-sounding-tbody');
                } else {
                    tbodyImprovedTable.emptyElement();
                }

                let splittedLog = rawLog.split("<br>");
                let soundingTbody = '';
                for (i = 0; i < splittedLog.length; i++) {
                    let row = _this.replaceSoundingCommas(splittedLog[i]);
                    row = _this.removeSoundingHeaders(row);
                    let splittedRow = row.split("|");
                    if (splittedRow.length > 1) {
                        soundingTable += '<tr>';
                        for (let k = 0; k < splittedRow.length; k++) {
                            let cellContent = splittedRow[k].trim();
                            cellContent = escapeHTML(cellContent);

                            switch (k) {
                                case 1:
                                    if (!cellContent.match(/^([0-9]{1,4})\s\(VALID\)$/)) {
                                        cellContent = '<span class="cge-avglink-text">'+cellContent+'</span>';
                                    }
                                    break;
                                case 2:
                                    if (cellContent !== '3 (TRACKING)') {
                                        cellContent = '<span class="cge-avglink-text">'+cellContent+'</span>';
                                    }
                                    break;
                                case 3:
                                    if (cellContent !== '0 (NONE)') {
                                        cellContent = '<span class="cge-avglink-text">'+cellContent+'</span>';
                                    }
                                    break;
                            }

                            soundingTbody += '<td>'+cellContent+'</td>';
                        }
                        soundingTbody += '</tr>';
                    }
                }

                tbodyImprovedTable.insertAdjacentHTML('afterbegin', soundingTbody);

            }
        });

        // configuration of the observer:
        let config = {
            attributes: true,
            childList: true,
            characterData: true
        };

        // pass in the target node, as well as the observer options
        this.medusaObserver.observe(soundingStatsLog, config);

        soundingStatsBlock.style.position = 'relative';
        soundingStatsBlock.style.overflow = 'hidden';

        soundingStatsTable.style.position = 'absolute';
        soundingStatsTable.style.left = '4000px';
    }
};

/* ======================================================================
 *  =APEvaluation
 * ======================================================================*/

/**
 * Get evaluation Data
 * @returns {boolean}
 */
CanopyEnhancer.prototype.extractAPEvaluationData = function() {
    let rawAPEval = this.apEvaluationBlock.innerHTML;
    let tmpAPEvalFields = this.APEvaluationFields[this.currentRadioModulation];

    let regex = /<br\s*[\/]?>/gi;
    rawAPEval = rawAPEval.replace(regex, " ");
    rawAPEval = rawAPEval.replace(/\&nbsp\;/gi, " ");
    let splittedEval = rawAPEval.split("*********************************************");

    splittedEval[0] = splittedEval[0].replace(/([\n]+)/g, " ");
    splittedEval[0] = splittedEval[0].replace(/([\s]+)/g, " ");

    let tmpFirstRowMatch = splittedEval[0].match(/AP Selection Method used\:(.*)\sCurrent entry index\:/);
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

    if (this.debugMessages() === true) {
        console.log("AP Selection Method: " + this.apSelectionMethod);
        console.log("Current eval entry: " + this.currentEvaluatinEntry);
        console.log("Session status: " + this.currentSessionStatus);
    }

    delete(splittedEval[0]);
    for (let i=1;i<splittedEval.length;i++) {
        let index = i - 1;
        let tmpStr = splittedEval[i];
        let tmpObj = {};
        let tmpMatch;
        let tmpRegexp;

        for(let k = 0;k < tmpAPEvalFields.length;k++) {
            let kplus = k+1;
            let pre_pattern = RegExp.quote(tmpAPEvalFields[k]);

            if (kplus < tmpAPEvalFields.length) {
                let post_pattern = RegExp.quote(tmpAPEvalFields[kplus]);

                // Fix for sw version < 14.1.1
                if (post_pattern === 'Beacon Receive Power' && this.currentRadioModulation === 'MIMO_OFDM') {
                    post_pattern += '(?:\\sLevel)?'
                }

                if (pre_pattern === 'RegFail') {
                    tmpRegexp = new RegExp(pre_pattern + " ([0-9]+).*" + post_pattern+"\:");
                } else if (pre_pattern === 'Beacon Receive Power' && this.currentRadioModulation === 'MIMO_OFDM') {
                    // Fix for sw version < 14.1.1
                    tmpRegexp = new RegExp(pre_pattern + "(?:\\sLevel)?\:(.*)" + post_pattern);
                } else {
                    tmpRegexp = new RegExp(pre_pattern + "\:(.*)" + post_pattern);
                }
                tmpMatch = tmpStr.match(tmpRegexp);
                if (tmpMatch) {
                    tmpObj[pre_pattern] = tmpMatch[1].trimBlank();
                }
            } else {
                tmpRegexp = new RegExp(pre_pattern+"\:(.*)ms");
                tmpMatch = tmpStr.match(tmpRegexp);
                if (tmpMatch) {
                    tmpObj[pre_pattern] = tmpMatch[1].trimBlank()+' ms';
                }
                if ( (i+1 === splittedEval.length) && (this.currentSessionStatus === 'SCANNING')) {
                    tmpRegexp = new RegExp(pre_pattern+"\:(?:.*)?Currently Scanning:\\s(.*)");
                    tmpMatch = tmpStr.match(tmpRegexp);
                    if (tmpMatch) {
                        this.currentlyScanning = tmpMatch[1].trimBlank();
                    }
                }
            }
        }
        this.APEvaluationObj[index] = tmpObj;
    }
    return (this.APEvaluationObj.length > 0);
};

/**
 * Render AP Evaluation data in HTML
 */
CanopyEnhancer.prototype.renderBetterEvaluationTemplate = function() {
    let betterEvalBlock = document.getElementById('betterEvaluation');
    if (typeof(betterEvalBlock) === 'undefined' || betterEvalBlock == null) {
        betterEvalBlock = document.createElement("div");
        betterEvalBlock.id = 'betterEvaluation';
        betterEvalBlock.emptyElement();
        this.apEvaluationBlock.parentNode.insertBefore(betterEvalBlock, this.apEvaluationBlock.nextSibling);
    }

    let evaluationContent = '';
    evaluationContent += "<div class='betterEvaluationHead'> <b>AP Selection Method:</b> "+this.apSelectionMethod+' - ';
    evaluationContent += ' <b>Current evaluation entry:</b> <a href="#cge-ap-eval-entry-'+this.currentEvaluatinEntry+'">'+this.currentEvaluatinEntry+'</a> - ';
    evaluationContent += " <b>Session status:</b> "+this.currentSessionStatus;
    if (this.currentSessionStatus === 'SCANNING') {
        evaluationContent += " - <b>Currently Scanning:</b> "+this.currentlyScanning;
    }
    evaluationContent += "</div><hr /><br />";

    for(let i = 0;i<this.APEvaluationObj.length;i++) {
        let evalEntry = this.APEvaluationObj[i];
        let currIndex = Number(evalEntry['Index']);
        delete evalEntry['Index'];

        let insRow = true;
        let counter = 0;
        evaluationContent += '<div class="cge-ap-evaluation-entry-title">';
        evaluationContent += '<a name="cge-ap-eval-entry-'+currIndex+'"></a>Entry: ' + currIndex;
        if (currIndex == this.currentEvaluatinEntry) {
            evaluationContent += ' - Current AP';
        }
        evaluationContent += '</div>';
        evaluationContent += '<table class="table table-responsive table-striped table-condensed table-bordered cge-ap-evaluation-entry-table"><tbody>';
        for (let prop in evalEntry) {
            if(!evalEntry.hasOwnProperty(prop)) continue;
            counter++;
            if (insRow === true) {
                evaluationContent += '<tr>';
                insRow = false;
            }
            switch (prop) {
                case 'Beacon Receive Power':
                case 'Beacon Receive Power Level':
                    let tmpres = evalEntry[prop].match(/\-(([0-9]+)(\.([0-9]))?)/);
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
                case 'SectorUserCount':
                    evaluationContent += '<td class="cge-highlight-eval-entry">'+prop+': '+evalEntry[prop]+'</td>';
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

    betterEvalBlock.emptyElement();
    betterEvalBlock.insertAdjacentHTML('afterbegin', evaluationContent);
    this.apEvaluationBlock.style.display = 'none';
};

/**
 * Initialize better evaluation
 */
CanopyEnhancer.prototype.betterEvaluation = function() {
    if (this.apEvaluationBlock !== null && this.settings.cge_ap_evaluation) {
        if (typeof this.APEvaluationFields[this.currentRadioModulation] !== 'undefined') {
            if (this.extractAPEvaluationData()) {
                if (this.refreshTime > 0) {
                    let _this = this;
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
    }
};

/* ======================================================================
 *  =MACLookUp
 * ======================================================================*/

/**
 * MAC Lookup API
 * @param block
 * @constructor
 */
CanopyEnhancer.prototype.MACLookUp = function(block) {
    let _this = this;
    let blockRect = block.getBoundingClientRect();
    let macaddress = block.textContent.trimBlank();
    block.classList.add('cge-highlight');

    if (macaddress.isMAC()) {
        jsonp('https://maclookup.info/api/jsonp/'+macaddress, function(response) {
            if (response.ok !== undefined) {
                let attrContent;
                if (_this.debugMessages() === true) {
                    console.log(response);
                }
                if (response.ok === true) {
                    attrContent = "Company: " + response.data.company + "\n\n";
                    attrContent += "MAC Prefix: " + response.data.prefix + "\n\n";
                    attrContent += "Address: " + response.data.address+ "\n\n";
                    attrContent += "Country Code: " + response.data.country_code

                } else {
                    attrContent = "Error, no result";
                }

                _this.tooltipMACNode.emptyElement();
                _this.tooltipMACNode.appendChild(document.createTextNode(attrContent));
                _this.tooltipMACNode.style.display = 'block';
                let tooltipRect = _this.tooltipMACNode.getBoundingClientRect();
                _this.tooltipMACNode.style.top = ( (blockRect.top + document.scrollingElement.scrollTop) - (tooltipRect.height) - 5) + "px";
                _this.tooltipMACNode.style.left = ( (blockRect.left + (blockRect.width / 2)) - (tooltipRect.width / 2))+ "px";
            }
        });
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
    let _this = this;

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
 * Tooltip
 * @constructor
 */
CanopyEnhancer.prototype.MACLookupTooltip = function() {
    // Tooltip
    this.tooltipMACNode = document.createElement('div');
    this.tooltipMACNode.id = 'cge-mac-lookup-tooltip';
    this.tooltipMACNode.className = 'cge-tooltip';
    document.getElementsByTagName("body")[0].appendChild(this.tooltipMACNode);
};

/**
 * ARP Page processing
 */
CanopyEnhancer.prototype.MacLookupPage = function() {
    if ((this.currentCatIndex === 2 &&
        (this.currentPageIndex === 20 || this.currentPageIndex === 5 || this.currentPageIndex === 21)) &&
        (this.settings.cge_mac_lookup === 1)) {
        this.MACLookupTooltip();
        this.addMACLookUpListener('#page');
    }
};

/* ======================================================================
 *  =NAT Table
 * ======================================================================*/

/**
 * IP Lookup
 *
 * @param block
 * @constructor
 */
CanopyEnhancer.prototype.IPLookUp = function(block) {
    let _this = this;
    let blockRect = block.getBoundingClientRect();
    let ip = block.textContent.trimBlank();
    block.classList.add('cge-highlight');
    if (ip.isValidPubIP()) {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://ipinfo.io/' + ip+'/json', true);
        request.onload = function () {
            var attrContent;
            if (request.status >= 200 && request.status < 400) {

                // Success!
                var data = JSON.parse(request.responseText);
                if (_this.debugMessages() === true) {
                    console.log(data);
                }
                if (data.ip !== 'undefined') {
                    attrContent = "AS: " + data.org + "\n";
                    attrContent += "Country: " + data.country +"\n";
                    attrContent += "Region: " + data.region+ "\n";
                    attrContent += "City: " + data.city+ "\n";
                    attrContent += "Hostname: " + data.hostname;
                } else {
                    attrContent = "Error, no result";
                }
            } else {
                // Error
                attrContent = "Error, no result";
            }

            _this.tooltipIPNode.emptyElement();
            _this.tooltipIPNode.appendChild(document.createTextNode(attrContent));
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
    if (this.currentCatIndex === 5 && this.currentPageIndex === 9 && this.settings.cge_ip_lookup === 1) {

        // Tooltip
        this.tooltipIPNode = document.createElement('div');
        this.tooltipIPNode.id = 'cge-ip-lookup-tooltip';
        this.tooltipIPNode.className = 'cge-tooltip';
        document.getElementsByTagName("body")[0].appendChild(this.tooltipIPNode);

        // Listeners
        this.addIPLookUpListener('#page');
    }
};

/* ======================================================================
 *  =AP Throughput page
 * ======================================================================*/

/**
 * Is the throughput page
 * @returns {boolean}
 */
CanopyEnhancer.prototype.isAPThroughputPage = function() {
    if (this.currentCatIndex === 2 && this.currentPageIndex === 12) {
        return true;
    }
    return (document.getElementById('SectionLUIDStats') !== null);
};

/**
 * AP Throughput check
 * @constructor
 */
CanopyEnhancer.prototype.APThroughput = function() {
    if (this.isAPThroughputPage() && this.settings.cge_ap_throughput === 1) {
        if (this.refreshTime === 0) {
            document.getElementById('SectionLUIDStats').insertAdjacentHTML(
                'beforebegin',
                '<div class="cge-error">Set Webpage Auto Update > 0 for real time stats (Configuration => General)</div>'
            );
        } else {
            this.APThroughputCalc();
        }
    }
};

/**
 * AP Throughput calculation
 * @constructor
 */
CanopyEnhancer.prototype.APThroughputCalc = function() {
    if (this.isAPThroughputPage()) {
        let table = document.getElementById('LuidOLtable');
        let tbody = table.querySelector('tbody');
        let rows = tbody.querySelectorAll('tr');
        let totalInTraffic = 0;
        let totalOutTraffic = 0;
        if (rows.length > 0) {

            table.querySelector('thead tr:nth-child(1) th:nth-child(3)').setAttribute('colspan', 14);
            table.querySelector('thead tr:nth-child(2) th:nth-child(1)').setAttribute('colspan', 7);
            table.querySelector('thead tr:nth-child(2) th:nth-child(2)').setAttribute('colspan', 7);

            // Add new columns
            table.querySelector('thead tr:nth-child(3) th:nth-child(1)').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">traffic (Mbps)</th>'
            );
            table.querySelector('thead tr:nth-child(3) th:nth-child(4)').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">data usage</th>'
            );
            table.querySelector('thead tr:nth-child(3) th:nth-child(8)').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">traffic (Mbps)</th>'
            );
            table.querySelector('thead tr:nth-child(3) th:nth-child(11)').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">data usage</th>'
            );

            for(let i = 0; i <  rows.length; i++) {
                let LUID = parseInt(rows[i].querySelector('td:nth-child(2)').textContent);
                if (LUID < 255) {
                    let InTraffic, OutTraffic, InPPS, OutPPS;
                    let currInOctets = intval(rows[i].querySelector('td:nth-child(3)').textContent);
                    let currOutOctets = intval(rows[i].querySelector('td:nth-child(8)').textContent);

                    let currInPackets = intval(rows[i].querySelector('td:nth-child(4)').textContent);
                    let currOutPackets = intval(rows[i].querySelector('td:nth-child(9)').textContent);

                    if (this.APThroughputSM[LUID] !== undefined) {
                        /*
                         * IN
                         */
                        // traffic
                        InTraffic = this.calcPerSeconds(currInOctets, this.APThroughputSM[LUID].prevInOctets);
                        this.APThroughputSM[LUID].prevInOctets = currInOctets;
                        // packets
                        InPPS = this.calcPerSeconds(currInPackets, this.APThroughputSM[LUID].prevInPackets);
                        InPPS = Math.round(InPPS);
                        this.APThroughputSM[LUID].prevInPackets = currInPackets;

                        /*
                         * OUT
                         */
                        // traffic
                        OutTraffic = this.calcPerSeconds(currOutOctets, this.APThroughputSM[LUID].prevOutOctets);
                        this.APThroughputSM[LUID].prevOutOctets = currOutOctets;
                        // packets
                        OutPPS = this.calcPerSeconds(currOutPackets, this.APThroughputSM[LUID].prevOutPackets);
                        OutPPS = Math.round(OutPPS);
                        this.APThroughputSM[LUID].prevOutPackets = currOutPackets;
                    } else {
                        this.APThroughputSM[LUID] = {
                            prevInOctets: currInOctets,
                            prevInPackets: currInPackets,
                            prevOutOctets: currOutOctets,
                            prevOutPackets: currOutPackets
                        };
                        InTraffic = 0;
                        OutTraffic = 0;
                        InPPS = 0;
                        OutPPS = 0;
                    }
                    totalInTraffic = totalInTraffic + InTraffic;
                    totalOutTraffic = totalOutTraffic + OutTraffic;

                    InTraffic = InTraffic.byte2Mbit().toFixed(2);
                    OutTraffic = OutTraffic.byte2Mbit().toFixed(2);

                    rows[i].querySelector('td:nth-child(3)').insertAdjacentHTML('afterend', '<td class="cge-highlight">'+InTraffic+'</td>');
                    rows[i].querySelector('td:nth-child(5)').insertAdjacentHTML('beforeend', "<br /><b class=\"cge-color-blue-cambium\">"+InPPS+" pps</b>");
                    rows[i].querySelector('td:nth-child(6)').insertAdjacentHTML('afterend', '<td class="cge-highlight">'+this.APThroughputSM[LUID].prevInOctets.formatDataUsage()+'</td>');

                    rows[i].querySelector('td:nth-child(10)').insertAdjacentHTML('afterend', '<td class="cge-highlight">'+OutTraffic+'</td>');
                    rows[i].querySelector('td:nth-child(12)').insertAdjacentHTML('beforeend', "<br /><b class=\"cge-color-blue-cambium\">"+OutPPS+" pps</b>");
                    rows[i].querySelector('td:nth-child(13)').insertAdjacentHTML('afterend', '<td class="cge-highlight">'+this.APThroughputSM[LUID].prevOutOctets.formatDataUsage()+'</td>');

                } else {
                    rows[i].querySelector('td:nth-child(3)').insertAdjacentHTML('afterend', '<td></td>');
                    rows[i].querySelector('td:nth-child(5)').insertAdjacentHTML('afterend', '<td></td>');
                    rows[i].querySelector('td:nth-child(10)').insertAdjacentHTML('afterend', '<td></td>');
                    rows[i].querySelector('td:nth-child(12)').insertAdjacentHTML('afterend', '<td></td>');
                }
            }
        }
    }
};

/* ======================================================================
 *  =DATA VC SECTION
 * ======================================================================*/

/**
 * Is the throughput page
 * @returns {boolean}
 */
CanopyEnhancer.prototype.isDataVCPage = function() {
    return (this.currentCatIndex === 2 && this.currentPageIndex === 11);
};

/**
 * AP Throughput check
 * @constructor
 */
CanopyEnhancer.prototype.dataVC = function() {
    if (this.isDataVCPage() && this.settings.cge_ap_data_vc === 1) {
        if (this.refreshTime === 0) {
            document.getElementById('SectionDnlkStatsHW').insertAdjacentHTML(
                'beforebegin',
                '<div class="cge-error">Set Webpage Auto Update > 0 for real time stats (Configuration => General)</div>'
            );
        } else {
            this.dataVCCalc();
        }
    }
};

/**
 * AP Throughput calculation
 * @constructor
 */
CanopyEnhancer.prototype.dataVCCalc = function() {
    if (this.isDataVCPage() && this.settings.cge_ap_data_vc === 1) {
        let table = document.getElementById('datavctable');
        let tbody = table.querySelector('tbody');
        let rows = tbody.querySelectorAll('tr');
        let totalInTraffic = 0;
        let totalOutTraffic = 0;

        let isPre151 = (document.getElementById('datavctablefragmodulation') === null);

        let tableConfig;

        switch (this.currentRadioModulation) {
            case PLATFORM_FSK:
                tableConfig = {
                    header: {
                        colspanIn: "7",
                        colspanOut: "7",
                        inMbpsAfter: "1",
                        inDataUsageAfter: "4",
                        outMbpsAfter: "8",
                        outDataUsageAfter: "11"
                    },
                    low: {
                        currInOctets: "4",
                        currInUPackets: "5",
                        currInNuPackets: "6",
                        currOutOctets: "9",
                        currOutUPackets: "10",
                        currOutNuPackets: "11"
                    },
                    high: {
                        currInOctets: "3",
                        currInUPackets: "4",
                        currInNuPackets: "5",
                        currOutOctets: "8",
                        currOutUPackets: "9",
                        currOutNuPackets: "10"
                    }
                };
                break;
            default:
                if (isPre151) {
                    tableConfig = {
                        header: {
                            colspanIn: "11",
                            colspanOut: "7",
                            inMbpsAfter: "1",
                            inDataUsageAfter: "4",
                            outMbpsAfter: "12",
                            outDataUsageAfter: "15"
                        },
                        low: {
                            currInOctets: "4",
                            currInUPackets: "5",
                            currInNuPackets: "6",
                            currOutOctets: "13",
                            currOutUPackets: "14",
                            currOutNuPackets: "15"
                        },
                        high: {
                            currInOctets: "3",
                            currInUPackets: "4",
                            currInNuPackets: "5",
                            currOutOctets: "8",
                            currOutUPackets: "9",
                            currOutNuPackets: "10"
                        }
                    };
                } else {
                    tableConfig = {
                        header: {
                            colspanIn: "7",
                            colspanOut: "7",
                            inMbpsAfter: "1",
                            inDataUsageAfter: "4",
                            outMbpsAfter: "8",
                            outDataUsageAfter: "11"
                        },
                        low: {
                            currInOctets: "4",
                            currInUPackets: "5",
                            currInNuPackets: "6",
                            currOutOctets: "9",
                            currOutUPackets: "10",
                            currOutNuPackets: "11"
                        },
                        high: {
                            currInOctets: "3",
                            currInUPackets: "4",
                            currInNuPackets: "5",
                            currOutOctets: "8",
                            currOutUPackets: "9",
                            currOutNuPackets: "10"
                        }
                    };
                }
                break;
        }

        if (rows.length > 0) {

            table.querySelector('thead tr:nth-child(1) th:nth-child(4)').setAttribute(
                'colspan',
                tableConfig.header.colspanIn
            );
            table.querySelector('thead tr:nth-child(1) th:nth-child(5)').setAttribute(
                'colspan',
                tableConfig.header.colspanOut
            );

            // In Mbps
            table.querySelector('thead tr:nth-child(2) th:nth-child('+tableConfig.header.inMbpsAfter+')').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">traffic (Mbps)</th>'
            );

            // In Data Usage
            table.querySelector('thead tr:nth-child(2) th:nth-child('+tableConfig.header.inDataUsageAfter+')').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">data usage</th>'
            );

            // Out Mbps
            table.querySelector('thead tr:nth-child(2) th:nth-child('+tableConfig.header.outMbpsAfter+')').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">traffic (Mbps)</th>'
            );

            // Out Data Usage
            table.querySelector('thead tr:nth-child(2) th:nth-child('+tableConfig.header.outDataUsageAfter+')').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">data usage</th>'
            );

            for(var i = 0; i <  rows.length; i++) {
                let LUID, VCType;
                if (rows[i].querySelector('td:nth-child(1)').textContent.length === 3) {
                    LUID = intval(rows[i].querySelector('td:nth-child(1)').textContent);
                    VCType = 'high';
                } else {
                    LUID = intval(rows[i].querySelector('td:nth-child(2)').textContent)
                    var htmlSMName = rows[i].querySelector('td:nth-child(1)').innerHTML;
                    htmlSMName = htmlSMName.replace(/\s\-\sLUID\:/, '<br />LUID:');
                    rows[i].querySelector('td:nth-child(1)').emptyElement();
                    rows[i].querySelector('td:nth-child(1)').insertAdjacentHTML('afterbegin', htmlSMName);
                    rows[i].querySelector('td:nth-child(1)').style.minWidth = '200px';
                    rows[i].querySelector('td:nth-child(1)').style.textAlign = 'left';
                    VCType = 'low';
                }

                if (LUID <= 255) {
                    let InTraffic, OutTraffic, InUPPS, InNuPPS, OutUPPS, OutNuPPS;
                    let currInOctets = intval(rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInOctets+')').textContent);
                    let currOutOctets = intval(rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutOctets+')').textContent);

                    let currInUPackets = intval(rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInUPackets+')').textContent);
                    let currInNuPackets = intval(rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInNuPackets+')').textContent);
                    let currOutUPackets = intval(rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutUPackets+')').textContent);
                    let currOutNuPackets = intval(rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutNuPackets+')').textContent);

                    if (this.APThroughputSM[LUID] !== undefined) {
                        /*
                         * IN
                         */
                        // traffic
                        InTraffic = this.calcPerSeconds(currInOctets, this.APThroughputSM[LUID].prevInOctets);
                        this.APThroughputSM[LUID].prevInOctets = currInOctets;

                        // Unicast packets
                        InUPPS = this.calcPerSeconds(currInUPackets, this.APThroughputSM[LUID].prevInUPackets);
                        InUPPS = Math.round(InUPPS);
                        this.APThroughputSM[LUID].prevInUPackets = currInUPackets;
                        // Non Unicast packets
                        InNuPPS = this.calcPerSeconds(currInNuPackets, this.APThroughputSM[LUID].prevInNuPackets);
                        InNuPPS = Math.round(InNuPPS);
                        this.APThroughputSM[LUID].prevInNuPackets = currInNuPackets;

                        /*
                         * OUT
                         */
                        // traffic
                        OutTraffic = this.calcPerSeconds(currOutOctets, this.APThroughputSM[LUID].prevOutOctets);
                        this.APThroughputSM[LUID].prevOutOctets = currOutOctets;

                        // packets
                        OutUPPS = this.calcPerSeconds(currOutUPackets, this.APThroughputSM[LUID].prevOutUPackets);
                        OutUPPS = Math.round(OutUPPS);
                        this.APThroughputSM[LUID].prevOutUPackets = currOutUPackets;

                        // packets
                        OutNuPPS = this.calcPerSeconds(currOutNuPackets, this.APThroughputSM[LUID].prevOutNuPackets);
                        OutNuPPS = Math.round(OutNuPPS);
                        this.APThroughputSM[LUID].prevOutNuPackets = currOutNuPackets;

                    } else {
                        this.APThroughputSM[LUID] = {
                            prevInOctets: currInOctets,
                            prevInUPackets: currInUPackets,
                            prevInNuPackets: currInNuPackets,
                            prevOutOctets: currOutOctets,
                            prevOutUPackets: currOutUPackets,
                            prevOutNuPackets: currOutNuPackets
                        };
                        InTraffic = 0;
                        OutTraffic = 0;
                        InUPPS = 0;
                        InNuPPS = 0;
                        OutUPPS = 0;
                        OutNuPPS = 0;
                    }
                    totalInTraffic = totalInTraffic + InTraffic;
                    totalOutTraffic = totalOutTraffic + OutTraffic;

                    InTraffic = InTraffic.byte2Mbit().toFixed(2);
                    OutTraffic = OutTraffic.byte2Mbit().toFixed(2);

                    // Outbound
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutNuPackets+')').insertAdjacentHTML(
                        'afterend',
                        '<td class="cge-highlight">'+this.APThroughputSM[LUID].prevOutOctets.formatDataUsage()+'</td>'
                    );
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutNuPackets+')').insertAdjacentHTML(
                        'beforeend',
                        '<br /><b class="cge-color-blue-cambium">' + OutNuPPS + ' pps</b>'
                    );
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutUPackets+')').insertAdjacentHTML(
                        'beforeend',
                        '<br /><b class="cge-color-blue-cambium">' + OutUPPS + ' pps</b>'
                    );
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutOctets+')').insertAdjacentHTML(
                        'afterend',
                        '<td class="cge-highlight">'+OutTraffic+'</td>'
                    );

                    // Inbound
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInNuPackets+')').insertAdjacentHTML(
                        'afterend',
                        '<td class="cge-highlight">'+this.APThroughputSM[LUID].prevInOctets.formatDataUsage()+'</td>'
                    );
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInNuPackets+')').insertAdjacentHTML(
                        'beforeend',
                        '<br /><b class="cge-color-blue-cambium">' + InNuPPS + ' pps</b>'
                    );
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInUPackets+')').insertAdjacentHTML(
                        'beforeend',
                        '<br /><b class="cge-color-blue-cambium">' + InUPPS + ' pps</b>'
                    );
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInOctets+')').insertAdjacentHTML(
                        'afterend', '<td class="cge-highlight">'+InTraffic+'</td>'
                    );

                } else {
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutNuPackets+')').insertAdjacentHTML('afterend', '<td></td>');
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutOctets+')').insertAdjacentHTML('afterend', '<td></td>');
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInNuPackets+')').insertAdjacentHTML('afterend', '<td></td>');
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInOctets+')').insertAdjacentHTML('afterend', '<td></td>');
                }
            }
        }
    }
};

/* ======================================================================
 *  =EventLog
 * ======================================================================*/

CanopyEnhancer.prototype.EventLog = function() {
    if ( (this.currentCatIndex === 0 && this.currentPageIndex === 5  && (this.currentRadioModulation === 'MIMO_OFDM' || this.currentRadioModulation === 'FSK')) ||
        (this.currentCatIndex === 0 && this.currentPageIndex === 4  && this.currentRadioModulation === 'SISO_OFDM')) {
        let ContentBlock = document.getElementById('SysLoga');
        let ContentBlockHTML = ContentBlock.innerHTML;

        let checkSysStartup = ContentBlockHTML.match(/\*System Startup\*/igm);

        let logwrapper = document.createElement('div');
        logwrapper.id = 'cge-event-log-wrapper';

        let div, table, tbody, tr, td, rows;

        if (checkSysStartup) {

            let splittedLog = ContentBlockHTML.split("******System Startup******");

            div = document.createElement('div');
            div.className = 'cge-event-log-divider';
            table = document.createElement('table');
            table.className = 'table table-striped table-responsive table-condensed';
            tbody = document.createElement('tbody');

            for (let i = 0; i < splittedLog.length; i++) {

                rows = splittedLog[i].split("<br>");

                for (let k = 0; k < rows.length; k++) {
                    if (rows[k] !== "" && rows[k] !== " ") {
                        tr = document.createElement('tr');
                        td = document.createElement('td');

                        rows[k] = rows[k].replace('&lt;br /&gt;', "<br />");

                        this.eventLogErrorStrings.forEach(function(value, key){
                            rows[k] = highlightErrorsInText(value, rows[k]);
                        });

                        td.insertAdjacentHTML('afterbegin', rows[k]);
                        tr.appendChild(td);
                        tbody.appendChild(tr);
                    }
                }

                table.appendChild(tbody);
                div.appendChild(table);
                logwrapper.appendChild(div);

                if (i < splittedLog.length - 1) {
                    div = document.createElement('div');
                    div.className = 'cge-event-log-divider';
                    table = document.createElement('table');
                    table.className = 'table table-striped table-responsive table-condensed';
                    tbody = document.createElement('tbody');

                    var h4 = document.createElement('h4');
                    h4.className = 'cge-block-title';
                    h4.appendChild(document.createTextNode("******System Startup******"));
                    div.appendChild(h4);
                }
            }
        } else {
            if (ContentBlockHTML.length > 0) {

                div = document.createElement('div');
                div.className = 'cge-event-log-divider';
                table = document.createElement('table');
                table.className = 'table table-striped table-responsive table-condensed';
                tbody = document.createElement('tbody');

                rows = ContentBlockHTML.split("<br>");

                for (let k = 0; k < rows.length; k++) {
                    if (rows[k] !== "" && rows[k] !== " ") {
                        tr = document.createElement('tr');
                        td = document.createElement('td');

                        rows[k] = rows[k].replace('&lt;br /&gt;', "<br />");

                        this.eventLogErrorStrings.forEach(function(value, key){
                            rows[k] = highlightErrorsInText(value, rows[k]);
                        });

                        td.insertAdjacentHTML('afterbegin', rows[k]);
                        tr.appendChild(td);
                        tbody.appendChild(tr);
                    }
                }

                table.appendChild(tbody);
                div.appendChild(table);
                logwrapper.appendChild(div);
            }
        }
        ContentBlock.emptyElement();
        ContentBlock.appendChild(logwrapper);
    }
};


/* ======================================================================
 *  =SessionStatus
 * ======================================================================*/

/**
 * Is the session status page?
 * @returns {boolean}
 */
CanopyEnhancer.prototype.isSessionStatusPage = function() {
    return (this.currentCatIndex === 0 && this.currentPageIndex === 2);
};

/**
 * Session Status page
 */
CanopyEnhancer.prototype.sessionStatus = function() {
    if (this.isSessionStatusPage()) {
        let span, frag;
        let allModulationCells = document.querySelectorAll('#luidlisttable_3 tr td:nth-child(3)');
        for (var i = 0;i < allModulationCells.length;i++) {
            let matchAllModulations = allModulationCells[i].innerHTML.match(/VC\s{1,2}(?:[\d]{1,3})\sRate\s(?:\d)X\/(\d)X\s((?:MIMO|SISO)\-?(?:[A-B]))/igm);
            if (matchAllModulations) {

                frag = document.createDocumentFragment();

                for (var j = 0; j < matchAllModulations.length; j++) {
                    if (j > 0) {
                        frag.appendChild(document.createElement('br'));
                    }
                    let matchModulation = matchAllModulations[j].match(/VC\s{1,2}(?:[\d]{1,3})\sRate\s(?:\d)X\/(\d)X\s((?:MIMO|SISO)\-?(?:[A-B]))/i);
                    let adaptRate = intval(matchModulation[1]);

                    span = document.createElement('span');
                    span.className = this.getAdaptRateClass(adaptRate, matchModulation[2]);
                    span.appendChild(document.createTextNode(matchModulation[0]));
                    frag.appendChild(span);
                }

                allModulationCells[i].emptyElement();
                allModulationCells[i].appendChild(frag);
            }

        }
    }
};

if (typeof DataVCStatOnload === 'undefined') {
    function DataVCStatOnload(){}
}

var CGE = new CanopyEnhancer();
CGE.initialize();
