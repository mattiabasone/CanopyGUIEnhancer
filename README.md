Canopy GUI Enhancer - Chrome Extension
==========

This extension enhance the standard CambiumNetworks Canopy Web GUI (tested on PMP100 PMP430 and PMP450)
Available here: https://goo.gl/0SKMRJ
Thread on the Official Cambium Networks Forum: http://goo.gl/fyt51w

## Requirements

The extension has been tested on the following software versions, with old versions not all features may work.

* PMP100: 13.4.1
* PMP430: 13.4.1
* PMP450: 14.\*/15.\*

## Features

* Real time throughput on Statistics -> Ethernet and Statistics -> Radio.
* MAC Address Lookup on ARP page.
* IP Address Lookup on NAT Table page.
* Improved AP Evaluation page.
* New styles for tables and buttons (Twitter Bootstrap)
* New styles for wrappers

## Changelog

### Version 1.8

* Added Throughput, PPS and data usage in the Data VC table (AP only)
* Added PHP-like intval() function
* Added Site Name in the h1 tag on each page
* Added Changelog button (settings popup)
* Added EscapeHTML on SetupAjax (does not pass review on Firefox Add-On platform)
* Added colors for signal, SNR and Adapt Rate in homepage
* Added colors for Adapt Rate in the Session Status page
* Added highlight for Ethernet/Radio interface errors
* Added dark theme
* Added Sounding Statistics table (PMP450m)
* Added version in the settings popup
* Added pps calculation in Ethernet and Radio tabs
* Improved Event Log formatting
* Changed menu styles
* Renamed background.js in content_loader.js
* Changed icons
* [Bugfix] Console error in content_loader.js
* [Bugfix] AP Throughput page does not work with 14.2
* [Bugfix] Ethernet link speed check does not work on 14.2
* [Bugfix] Saved settings does not load in the popup on Firefox
* [Bugfix] Fixed wrong font style (Firefox)
* [Bugfix] MAC Address lookup does not work on 14.2/14.2.1
* [Bugfix] Extension does not work on 14.2/14.2.1 2.4GHz PMP450
* [Bugfix] Removed some innerHTML
* [Bugfix] Code cleaning
* [Bugfix] PMP450m was detected as "SM"
* [Bugfix] Event log does not show last entry
* [Bugfix] 13.4.1 PMP100 Data VC page rendering

### Version 1.7

* Added MAC Lookup for Statistics -> Bridging Table
* Changed links color
* Changed left menu colors
* Changed AP Evaluation entries headers style
* [Bugfix] Wrong calculations for tooltip position
* [Bugfix] Extension does not work with PMP100 AP "Adjustable Power"

### Version 1.6

* Added per-SM traffic and packets per seconds in the AP -> Statistics -> Throughput page
* Added conversion miles => kilometres in homepage
* [Bugfix] In the AP Evaluation the "Beacon Power Level" entry isn't displayed on radio with software version < 14.1.1

### Version 1.5

* Improved stats update
* Added setting for AP Evaluation parsing
* Changed ip-api.com with ipinfo.io for IP addresses lookup (whois)
* Small CSS changes
* [Bugfix] macvendors.co requests didn't work without jsonp

### Version 1.4

* Added graphs for real time traffic representation
* Added some css rules for settings popup
* Added alert message if webpage auto update is not set
* [Bugfix] AP evaluation didn’t work properly with PMP100/430
* [Bugfix] Spectrum Analyzer didn’t work with the extension enabled

### Version 1.3

* AP Evaluation not rendered on radios with software version < 14.1.1

### Version 1.2

* Improved IP Lookup speed on NAT Log Page
* Added settings for IP and MAC Lookup
* Added highlight on selected IP/MAC
* Renamed some CSS classes
* Removed unused CSS classes

### Version 1.1

* Small Bug fixes

### Version 1.0

* First release
