## Version 1.8.10

Changes:
* Added highlight for Ethernet/Radio interface errors

## Version 1.8.9

Bugfixes:
* Enhanced Data VC does not work on 15.1 beta firmware

## Version 1.8.8

Changes:
* Changed icons
* Added version in the settings popup

Bugfixes:
* Event log does not show last entry

## Version 1.8.7

Changes:
* Added Sounding Statistics table (PMP450m)

Bugfixes:
* PMP450m was detected as "SM"

## Version 1.8.6

Changes:
* Added dark theme
* Changed menu styles

Bugfixes:
* Removed Spaghetti

## Version 1.8.5

Bugfixes:
* Event Log is empty if it doesn't contains "System Startup" string
* Menu glitches

## Version 1.8.4

Changes:
* Added colors for signal, SNR and Adapt Rate in homepage
* Added colors for Adapt Rate in the Session Status page
* Improved Event Log formatting
* Changed menu styles

## Version 1.8.3

Bugfixes
* MAC Address lookup does not work on 14.2/14.2.1
* Extension does not work on 14.2/14.2.1 2.4GHz PMP450
* Removed some innerHTML
* Code cleaning

## Version 1.8.2

Changes:
* Added EscapeHTML on SetupAjax (or it does not pass review on Firefox Add-On platform)

Bugfixes
* Saved settings does not load in the popup on Firefox
* Fixed wrong font style (Firefox)

## Version 1.8.1

Changes:
* Renamed background.js in content_loader.js

Bugfixes
* AP Throughput page does not work with 14.2
* Ethernet link speed check does not work on 14.2

## Version 1.8

Features:
* Added Throughput, PPS and data usage in the Data VC table (AP only)
* Added PHP-like intval() function
* Added Site Name in the h1 tag on each page
* Added Changelog button (settings popup)

Changes:
* Moved "Site Information" at the top of the page (Homepage)

Bugfixes
* Fixed console error in content_loader.js

## Version 1.7

Features:
* Added MAC Lookup for Statistics -> Bridging Table

Changes:
* Changed links color
* Changed left menu colors
* Changed AP Evaluation entries headers style

Bugfixes
* Wrong calculations for tooltip position
* The Extension does not work with PMP100 AP "Adjustable Power"

## Version 1.6

Features:
* Added per-SM traffic and packets per seconds in the AP -> Statistics -> Throughput page
* Added conversion miles => kilometres in homepage

Bugfixes:
* In the AP Evaluation the "Beacon Power Level" entry isn't displayed on radio with software version < 14.1.1

## Version 1.5

Features:
* Added setting for AP Evaluation parsing
* Changed ip-api.com with ipinfo.io for IP addresses lookup (whois)
* Small CSS changes

Performance:
* Improved stats update

Bugfixes:
* macvendors.co requests didn't work without jsonp

## Version 1.4

Features:
* Added graphs for real time traffic representation
* Added some css rules for settings popup
* Added alert message if webpage auto update is not set

Bugfixes:
* AP evaluation didn’t work properly with PMP100/430
* Spectrum Analyzer didn’t work with the extension enabled

## Version 1.3

Bugfixes:
* AP Evaluation not rendered on radios with software version < 14.1.1

## Version 1.2

Features:
* Added settings for IP and MAC Lookup
* Added highlight on selected IP/MAC

Performance:
* Improved IP Lookup speed on NAT Log Page

Changes:
* Renamed some CSS classes
* Removed unused CSS classes

## Version 1.1

Bugfixes:
* Small Bug fixes

## Version 1.0

Features:
* First release
