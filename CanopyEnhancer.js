/**
 * Canopy GUI Enhancer
 * @constructor
 */
var CanopyEnhancer = function() {
    this.refreshTime = 0;
    this.tooltipMACNode = {};
    this.tooltipIPNode = {};
    this.settings = {
        cge_enabled: 1,
        cge_custom_css: 1,
        cge_ip_lookup: 1,
        cge_mac_lookup: 1,
        cge_ap_evaluation: 1,
        cge_ap_throughput: 1,
        cge_rtt_type: 'string',
        cge_debug : 0
    };
    this.intervalsTimeout = 0;
    this.currentCatIndex = -1;
    this.currentPageIndex = -1;
    this.currentRadioMAC = "000000000000";
    this.currentRadioModulation = "MIMO_OFDM";

    /**
     * Traffic
     */
    this.mainTrafficBlockID = null;
    this.inTrafficID = null;
    this.outTrafficID = null;
    this.realTimeTrafficChart = null;
    this.trafficData = {
        started: false,
        prevInOctets: 0,
        inTraffic: 0,
        prevOutOctets: 0,
        outTraffic: 0
    };

    /**
     * AP Evaluation
     */
    this.apEvaluationBlock = document.getElementById('APEval'); // #APEval
    this.APEvaluationObj = [];
    this.apSelectionMethod = "";
    this.currentEvaluatinEntry = -1;
    this.currentSessionStatus = "";
    this.currentlyScanning = "";

    /**
     * AP SM Throughput
     */
    this.APThroughputSM = {};

    /**
     * Sections
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
            12: "Throughput",
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
    }
};

/**
 * Initialize CanopyEnhancer
 */
CanopyEnhancer.prototype.initialize = function() {
    var _this = this;
    this.getRadioMac();
    if (this.currentRadioMAC != '000000000000') {

        this.loadSettings();

        var page = document.getElementById("page");
        var title = page.querySelector("h2");
        if (title !== null) {
            var titleString = title.innerText;
            var resDevType = titleString.match(/.*(?:GHz|MHz)(?:\sAdjustable\sPower)?\s\-\s([a-zA-Z\-\s]+)\s\-\s([A-Fa-f0-9\-]{17})/);
            if (resDevType != null) {
                this.currentRadioModulation = 'FSK';
            } else {
                resDevType = titleString.match(/.*(?:GHz|MHz)\sSISO\sOFDM\s\-\s([a-zA-Z\-\s]+)\s\-\s([A-Fa-f0-9\-]{17})/);
                if (resDevType != null) {
                    this.currentRadioModulation = 'SISO_OFDM';
                } else {
                    resDevType = titleString.match(/.*(?:GHz|MHz)\sMIMO\sOFDM\s\-\s([a-zA-Z\-\s]+)\s\-\s([A-Fa-f0-9\-]{17})/);
                }
            }
            this.getDevType(resDevType[1]);
        } else {
            if (_this.debugMessages() === true) {
                console.log("Title not found");
            }
        }

        if (_this.debugMessages() === true) {
            console.log("Current radio Modulation: " + this.currentRadioModulation);
            console.log("Current radio Type: " + this.currentRadioType);
        }

        this.identifySection();
        this.getRefreshTime();

        if (_this.debugMessages() === true) {
            console.log("CGE Enabled!");
            console.log("Current radio MAC " + _this.currentRadioMAC);
            console.log("Current Section Category: " + _this.getCurrentCatName());
            console.log("Current Section Page: " + _this.getCurrentPageName());
        }

        _this.enhancedCSS();
        _this.homePage();
        _this.realTimeTraffic();
        _this.betterEvaluation();
        _this.MacLookupPage();
        _this.NATTable();
        _this.APThroughput();
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
    var _this = this;

    if (this.refreshTime > 0) {
        function SetUpAJAX() {
            var request = document.request;
            if (request.readyState > 0 && request.readyState < 4) {
                return;
            }
            var vars = [];
            var sections = getElementsByClassName(document, 'table', 'section');
            for (var j = 0; j < sections.length; j++) {
                if (!sections[j].style.display || sections[j].style.display != "none") {
                    vars = vars.concat(getElementsByClassName(sections[j], 'span', 'var'));
                }
            }
            var params = location.search.substr(1);
            for (var i = 0; i < vars.length; i++) {
                params += '&' + vars[i].id + '=' + GetVarRefreshOption(vars[i].id);
            }
            params += '&' + RebootClass + '= ';
            request.open("POST", "query.cgi", true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send(params);
            request.onreadystatechange = function () {
                var request = document.request;
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        if (request.responseXML) {

                            if (_this.isTrafficPage()) {
                                _this.updateTrafficData(
                                    request.responseXML.getElementById(_this.inTrafficID).firstChild.nodeValue,
                                    request.responseXML.getElementById(_this.outTrafficID).firstChild.nodeValue
                                );
                            }

                            var vars = request.responseXML.getElementsByTagName('var');
                            for (var i = 0; i < vars.length; i++) {
                                var id = vars[i].getAttribute('id');
                                if (id != RebootClass) {
                                    var htmlCode = '';
                                    if (vars[i].hasChildNodes())
                                        htmlCode = vars[i].firstChild.nodeValue;
                                    id = PerformRefreshOverride(id, htmlCode);
                                    if (id) {
                                        var parent = document.getElementById(id);
                                        if (parent) {
                                            parent.innerHTML = htmlCode;
                                            if (document.createEvent) {
                                                var event = document.createEvent("Event");
                                                event.initEvent("change", true, true);
                                                parent.dispatchEvent(event);
                                            } else if (document.createEventObject) {
                                                var evObj = document.createEventObject();
                                                parent.fireEvent("onclick", evObj);
                                            }
                                        }
                                    }
                                } else {
                                    var rebootBoxes = getElementsByClassName(document, 'span', RebootClass);
                                    for (var j = 0; j < rebootBoxes.length; j++) {
                                        if (vars[i].hasChildNodes() && vars[i].firstChild.nodeValue) {
                                            rebootBoxes[j].innerHTML = vars[i].firstChild.nodeValue;
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
                            if (_this.ishomePage()) {
                                _this.homePageRender();
                            }
                            if (_this.isAPThroughputPage()) {
                                _this.APThroughputCalc();
                            }
                        }
                    } else if (request.status == 401) {
                        clearInterval(document.ajaxtimerid);
                        if (!document.rebootId)
                            window.location.reload();
                    }
                }
            };
        }
        clearInterval(document.ajaxtimerid);
        SetUpAJAX();
        document.ajaxtimerid = setInterval(SetUpAJAX, (this.refreshTime * 1000));
    }
};

/**
 * Get Radio MAC Address
 * @returns {boolean}
 */
CanopyEnhancer.prototype.getRadioMac = function() {
    var stylesheethref = document.getElementsByTagName('link')[0].getAttribute('href');
    var res = stylesheethref.match(/\_canopy\.css\?mac_esn\=([A-Fa-f0-9]{12})/);
    if (res != null) {
        this.currentRadioMAC = res[1].toUpperCase();
    } else {
        this.currentRadioMAC = '000000000000';
    }
};

/**
 * Load settings
 */
CanopyEnhancer.prototype.loadSettings = function() {
    var _this = this;
    try {
        var settings = JSON.parse(document.CGESettings);
        for (var key in settings) {
            if (!settings.hasOwnProperty(key)) continue;
            _this.settings[key] = settings[key];
        }
    } catch(e) {
        console.log(e);
    }
};

/**
 * Debug enabled?
 * @returns {boolean}
 */
CanopyEnhancer.prototype.debugMessages = function() {
    if (this.settings.cge_debug === 1) {
        return true;
    }
    return false;
};

/**
 * Add Custom CSS
 */
CanopyEnhancer.prototype.enhancedCSS = function() {
    if (this.settings.cge_custom_css === 1) {
        // Change submit buttons
        var allInputSubmit = document.querySelectorAll('input[type="submit"]');
        for (var i = 0;i < allInputSubmit.length;i++) {
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

/** ======================================================================
 *  =Homepage
 ** ======================================================================*/

/**
 * E' la homepage?
 * @returns {boolean}
 */
CanopyEnhancer.prototype.ishomePage = function() {
    if (this.currentCatIndex == 0 && this.currentPageIndex == 1) {
        return true;
    }
    return false;
};

/**
 * Home render
 */
CanopyEnhancer.prototype.homePageRender = function () {

    var linkStatus = document.getElementById("LinkStatus").innerText;
    if (linkStatus !== '100Base-TX Full Duplex' && linkStatus !== '1000Base-T Full Duplex') {
        document.getElementById("LinkStatus").innerHTML = ' <span class="cge-warning">'+document.getElementById("LinkStatus").innerHTML +'</span>'
    }

    var distanceBlock = document.getElementById('Distance');
    if (distanceBlock !== null) {
        var milesRegex = distanceBlock.innerText.match(/(([0-9]{1,2})\.([0-9]{0,3}))\smiles/);
        if (milesRegex !== null) {
            var km = parseFloat(milesRegex[1]) * 1.60934;
            distanceBlock.innerText += ' - '+km.toFixed(3)+' kilometres';
        }
    }
};

/**
 * Home page check
 */
CanopyEnhancer.prototype.homePage = function() {
    if (this.ishomePage()) {
        this.homePageRender();
        this.SetUpAJAX();
    }
};

/** ======================================================================
 *  =RealTimeTraffic
 ** ======================================================================*/


CanopyEnhancer.prototype.isTrafficPage = function() {
    if ((this.currentCatIndex == 2 && this.currentPageIndex == 7) || (this.currentCatIndex == 2 && this.currentPageIndex == 9)) {
        return true;
    }
    return false;
};

/**
 * Display realtime traffic
 */
CanopyEnhancer.prototype.realTimeTraffic = function() {
    var _this = this;
    if (_this.isTrafficPage()) {
        var sectionTitle = this.Sections[this.currentCatIndex].pages[this.currentPageIndex];

        if (this.currentPageIndex == 7) {
            this.mainTrafficBlockID = document.getElementById('SectionEthernet');
            this.inTrafficID = 'FecCb_ifmib_ifInOctets';
            this.outTrafficID = 'FecCb_ifmib_ifOutOctets';
        } else {
            this.mainTrafficBlockID = document.getElementById('SectionRFCBStat');
            this.inTrafficID = 'RfCb_ifmib_ifInOctets';
            this.outTrafficID = 'RfCb_ifmib_ifOutOctets';
        }

        this.SetUpAJAX();

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

                var chartData = {
                    labels: timeLabels,
                    datasets: [
                        {
                            label: "Interface Traffic In",
                            fillColor: "rgba(88,88,88,0.2)",
                            strokeColor: "rgba(88,88,88,1)",
                            pointColor: "rgba(88,88,88,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(88,88,88,1)",
                            data: [0, 0, 0, 0, 0]
                        },
                        {
                            label: "Interface Traffic Out",
                            fillColor: "rgba(50,143,191,0.2)",
                            strokeColor: "rgba(50,143,191,1)",
                            pointColor: "rgba(50,143,191,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(50,143,191,1)",
                            data: [0, 0, 0, 0, 0]
                        }
                    ]
                };

                var chartOpt = {

                    animation: true,
                    animationSteps: 20,
                    scaleBeginAtZero: true,
                    responsive: true,

                    ///Boolean - Whether grid lines are shown across the chart
                    scaleShowGridLines : true,

                    //String - Colour of the grid lines
                    scaleGridLineColor : "rgba(0,0,0,.05)",

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
                    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>; display: inline-block; width:10px; height:10px; margin-right:5px;\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%>: <span style=\"color:<%=datasets[i].strokeColor%>\"><span id=\"legend-<%=datasets[i].label.replace(/\\s/g, '')%>\">0.00</span> Mbps</span></li><%}%></ul>"

                };

                var ctx = document.getElementById("RTGChart").getContext("2d");
                this.realTimeTrafficChart = new Chart(ctx).Line(chartData, chartOpt);
                document.getElementById('RTGLegend').innerHTML = this.realTimeTrafficChart.generateLegend();

            } else {

                var el = document.createElement("span");
                el.id = 'cge-CurrInTraffic-wrap';
                el.className = 'cge-real-time-throughput cge-color-blue-cambium';
                el.innerHTML = ' (<span id="cge-CurrInTraffic">0.00</span> Mbps)</span>';
                document.getElementById(this.inTrafficID).parentNode.insertBefore(
                    el,
                    document.getElementById(this.inTrafficID).nextSibling
                );

                el = document.createElement("span");
                el.id = 'cge-CurrOutTraffic-wrap';
                el.className = 'cge-real-time-throughput cge-color-blue-cambium';
                el.innerHTML = ' (<span id="cge-CurrOutTraffic">0.00</span> Mbps)';
                document.getElementById(this.outTrafficID).parentNode.insertBefore(
                    el,
                    document.getElementById(this.outTrafficID).nextSibling
                );
            }
        } else {
            this.mainTrafficBlockID.insertAdjacentHTML(
                'beforebegin',
                '<div class="cge-error">Set Webpage Auto Update > 0 for real time throughput (Configuration => General)</div>'
            );
        }
    }
};

CanopyEnhancer.prototype.calcPerSeconds = function(current, previous) {
    return ((current - previous) / this.refreshTime);
};

/**
 * Updates traffic data from webpage
 */
CanopyEnhancer.prototype.updateTrafficData = function (currInOctets, currOutOctets) {
    currInOctets = parseInt(currInOctets);
    currOutOctets = parseInt(currOutOctets);

    if (this.trafficData.started) {

        this.trafficData.inTraffic = ((currInOctets - this.trafficData.prevInOctets) / this.refreshTime).byte2Mbit().round2().toFixed(2);
        this.trafficData.outTraffic = ((currOutOctets - this.trafficData.prevOutOctets) / this.refreshTime).byte2Mbit().round2().toFixed(2);

        this.trafficData.prevInOctets = currInOctets;
        this.trafficData.prevOutOctets = currOutOctets;

        /**
         * UPDATE GUI
         */
        if (this.settings.cge_rtt_type == 'graph') {
            var tmpTime = new Date();
            var timestring = tmpTime.getHours().leadingZero() + ':'+tmpTime.getMinutes().leadingZero()+':'+tmpTime.getSeconds().leadingZero();

            this.realTimeTrafficChart.addData(
                [this.trafficData.inTraffic, this.trafficData.outTraffic],
                timestring
            );
            this.realTimeTrafficChart.removeData();

            document.getElementById('legend-InterfaceTrafficIn').innerHTML = this.trafficData.inTraffic.toString();
            document.getElementById('legend-InterfaceTrafficOut').innerHTML = this.trafficData.outTraffic.toString();
        } else {
            document.getElementById('cge-CurrInTraffic').innerHTML = this.trafficData.inTraffic.toString();
            document.getElementById('cge-CurrOutTraffic').innerHTML = this.trafficData.outTraffic.toString();
        }

    } else {
        this.trafficData.prevInOctets = currInOctets;
        this.trafficData.inTraffic = 0;

        this.trafficData.prevOutOctets = currOutOctets;
        this.trafficData.outTraffic = 0;

        this.trafficData.started = true;
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
    var tmpAPEvalFields = this.APEvaluationFields[this.currentRadioModulation];

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

    if (this.debugMessages() === true) {
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

        for(var k = 0;k < tmpAPEvalFields.length;k++) {
            var kplus = k+1;
            var pre_pattern = RegExp.quote(tmpAPEvalFields[k]);

            if (kplus < tmpAPEvalFields.length) {
                var post_pattern = RegExp.quote(tmpAPEvalFields[kplus]);

                // Fix for sw version < 14.1.1
                if (post_pattern == 'Beacon Receive Power' && this.currentRadioModulation == 'MIMO_OFDM') {
                    post_pattern += '(?:\\sLevel)?'
                }

                if (pre_pattern == 'RegFail') {
                    tmpRegexp = new RegExp(pre_pattern + " ([0-9]+).*" + post_pattern+"\:");
                } else if (pre_pattern == 'Beacon Receive Power' && this.currentRadioModulation == 'MIMO_OFDM') {
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
                if ( (i+1 == splittedEval.length) && (this.currentSessionStatus == 'SCANNING')) {
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
    evaluationContent += "<div class='betterEvaluationHead'> <b>AP Selection Method:</b> "+this.apSelectionMethod+' - ';
    evaluationContent += ' <b>Current evaluation entry:</b> <a href="#cge-ap-eval-entry-'+this.currentEvaluatinEntry+'">'+this.currentEvaluatinEntry+'</a> - ';
    evaluationContent += " <b>Session status:</b> "+this.currentSessionStatus;
    if (this.currentSessionStatus == 'SCANNING') {
        evaluationContent += " - <b>Currently Scanning:</b> "+this.currentlyScanning;
    }
    evaluationContent += "</div><hr /><br />";

    for(var i = 0;i<this.APEvaluationObj.length;i++) {
        var evalEntry = this.APEvaluationObj[i];
        var currIndex = parseInt(evalEntry['Index']);
        delete evalEntry['Index'];

        var insRow = true;
        var counter = 0;
        evaluationContent += '<div class="cge-ap-evaluation-entry-title">';
        evaluationContent += '<a name="cge-ap-eval-entry-'+currIndex+'"></a>Entry: ' + currIndex;
        if (currIndex == this.currentEvaluatinEntry) {
            evaluationContent += ' - Current AP';
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
                case 'Beacon Receive Power Level':
                    var tmpres = evalEntry[prop].match(/\-(([0-9]+)(\.([0-9]))?)/);
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
    if (this.apEvaluationBlock != null && this.settings.cge_ap_evaluation) {
        if (this.APEvaluationFields[this.currentRadioModulation] != 'undefined') {
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
    }
};

/** ======================================================================
 *  =MACLookUp
 ** ======================================================================*/

/**
 * MAC Lookup API
 * @param block
 * @constructor
 */
CanopyEnhancer.prototype.MACLookUp = function(block) {
    var _this = this;
    var blockRect = block.getBoundingClientRect();
    var macaddress = block.innerText.trimBlank();
    block.classList.add('cge-highlight');

    if (macaddress.isMAC()) {
        jsonp('https://macvendors.co/api/jsonp/'+macaddress, function(data) {
            if (data.result !== undefined) {
                var attrContent;
                if (_this.debugMessages() === true) {
                    console.log(data);
                }
                if (data.result.error === undefined) {
                    attrContent = "Company: " + data.result.company + "\n\n";
                    attrContent += "MAC Prefix: " + data.result.mac_prefix + "\n\n";
                    attrContent += "Address: " + data.result.address;

                } else {
                    attrContent = "Error, no result";
                }
                _this.tooltipMACNode.innerHTML = attrContent;
                _this.tooltipMACNode.style.display = 'block';
                var tooltipRect = _this.tooltipMACNode.getBoundingClientRect();
                _this.tooltipMACNode.style.top = ( (blockRect.top + document.body.scrollTop) - (tooltipRect.height) - 5) + "px";
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
    if ((this.currentCatIndex == 2 && (this.currentPageIndex == 20 || this.currentPageIndex == 5)) && (this.settings.cge_mac_lookup == 1)) {
        this.MACLookupTooltip();
        this.addMACLookUpListener('#page');
    }
};

/** ======================================================================
 *  =NAT Table
 ** ======================================================================*/

/**
 * IP Lookup
 *
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
                    attrContent = "AS: " + data.org + "<br />";
                    attrContent += "Country: " + data.country +"<br />";
                    attrContent += "Region: " + data.region+ "<br />";
                    attrContent += "City: " + data.city+ "<br />";
                    attrContent += "Hostname: " + data.hostname;
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

/** ======================================================================
 *  =AP Throughput page
 ** ======================================================================*/

/**
 * Is the throughput page
 * @returns {boolean}
 */
CanopyEnhancer.prototype.isAPThroughputPage = function() {
    if (this.currentCatIndex == 2 && this.currentPageIndex == 12) {
        return true;
    }
    return false;
};

/**
 * AP Throughput check
 * @constructor
 */
CanopyEnhancer.prototype.APThroughput = function() {
    if (this.isAPThroughputPage() && this.settings.cge_ap_throughput == 1) {
        if (this.refreshTime > 0) {
            this.SetUpAJAX();
        } else {
            document.getElementById('SectionLUIDStats').insertAdjacentHTML(
                'beforebegin',
                '<div class="cge-error">Set Webpage Auto Update > 0 for real time stats (Configuration => General)</div>'
            );
        }
    }
};

/**
 * AP Throughput calculation
 * @constructor
 */
CanopyEnhancer.prototype.APThroughputCalc = function() {
    var table = document.getElementById('LuidOLtable');
    var tbody = table.querySelector('tbody');
    var rows = tbody.querySelectorAll('tr');
    var totalInTraffic = 0;
    var totalOutTraffic = 0;
    if (rows.length > 0) {
        table.querySelector('thead tr:nth-child(1) th:nth-child(3)').setAttribute('colspan', 14);
        table.querySelector('thead tr:nth-child(2) th:nth-child(1)').setAttribute('colspan', 7);
        table.querySelector('thead tr:nth-child(2) th:nth-child(2)').setAttribute('colspan', 7);
        table.querySelector('thead tr:nth-child(3) th:nth-child(1)').insertAdjacentHTML('afterend', '<th>traffic (Mbps)</th>');
        table.querySelector('thead tr:nth-child(3) th:nth-child(4)').insertAdjacentHTML('afterend', '<th>data usage</th>');
        table.querySelector('thead tr:nth-child(3) th:nth-child(8)').insertAdjacentHTML('afterend', '<th>traffic (Mbps)</th>');
        table.querySelector('thead tr:nth-child(3) th:nth-child(11)').insertAdjacentHTML('afterend', '<th>data usage</th>');
        for(var i = 0; i <  rows.length; i++) {
            var LUID = parseInt(rows[i].querySelector('td:nth-child(2)').innerText);
            if (LUID < 255) {
                var InTraffic, OutTraffic, InPPS, OutPPS;
                var currInOctets = parseInt(rows[i].querySelector('td:nth-child(3)').innerText);
                var currOutOctets = parseInt(rows[i].querySelector('td:nth-child(8)').innerText);

                var currInPackets = parseInt(rows[i].querySelector('td:nth-child(4)').innerText);
                var currOutPackets = parseInt(rows[i].querySelector('td:nth-child(9)').innerText);

                if (this.APThroughputSM[LUID] !== undefined) {
                    /**
                     * IN
                     */
                    // traffic
                    InTraffic = this.calcPerSeconds(currInOctets, this.APThroughputSM[LUID].prevInOctets);
                    this.APThroughputSM[LUID].prevInOctets = currInOctets;
                    // packets
                    InPPS = this.calcPerSeconds(currInPackets, this.APThroughputSM[LUID].prevInPackets);
                    InPPS = Math.round(InPPS);
                    this.APThroughputSM[LUID].prevInPackets = currInPackets;

                    /**
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
                rows[i].querySelector('td:nth-child(5)').innerHTML += "<br /><b class=\"cge-color-blue-cambium\">"+InPPS+" pps</b>";
                rows[i].querySelector('td:nth-child(6)').insertAdjacentHTML('afterend', '<td class="cge-highlight">'+this.APThroughputSM[LUID].prevInOctets.formatDataUsage()+'</td>');

                rows[i].querySelector('td:nth-child(10)').insertAdjacentHTML('afterend', '<td class="cge-highlight">'+OutTraffic+'</td>');
                rows[i].querySelector('td:nth-child(12)').innerHTML += "<br /><b class=\"cge-color-blue-cambium\">"+OutPPS+" pps</b>";
                rows[i].querySelector('td:nth-child(13)').insertAdjacentHTML('afterend', '<td class="cge-highlight">'+this.APThroughputSM[LUID].prevOutOctets.formatDataUsage()+'</td>');

            } else {
                rows[i].querySelector('td:nth-child(3)').insertAdjacentHTML('afterend', '<td></td>');
                rows[i].querySelector('td:nth-child(5)').insertAdjacentHTML('afterend', '<td></td>');
                rows[i].querySelector('td:nth-child(10)').insertAdjacentHTML('afterend', '<td></td>');
                rows[i].querySelector('td:nth-child(12)').insertAdjacentHTML('afterend', '<td></td>');
            }
        }
    }
};

var CGE;
CGE = new CanopyEnhancer();
if(document.readyState === "complete") {
    CGE.initialize();
} else {
    document.addEventListener('DOMContentLoaded', CGE.initialize);
}