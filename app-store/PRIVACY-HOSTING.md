# Hosted diary privacy

The iOS app loads https://nftalt1.com/ and therefore produces hosting requests. The supplied Nginx configuration and real logs show retained IP addresses, request paths/times and browser information in access/error logs. The previous no-data-collection draft for the bundled-only app must not be published unchanged.

Prepared declaration: Other Diagnostic Data, App Functionality (security, troubleshooting and uptime), linked to user/device details because raw IP addresses are retained, not used for tracking. The native privacy manifest matches this declaration. No diary text/profile is uploaded and no analytics/advertising SDK is included. Confirm there are no additional analytics, geolocation, advertising or log uses before publication; those would require additional declarations.

Apple source: https://developer.apple.com/app-store/app-privacy-details/ (web views and stored IP address guidance).
