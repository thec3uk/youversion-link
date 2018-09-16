# Reverse Proxy for YouVersion Event (could be anything though!)

This little site is used to make it super easy to update a subdomain to point to any url, in this case our YouVersion Events links.

This was done to limit admin access within our main site, so non technical people don't break things by mistake ;)

## /
The root url is the proxy url, this is what you share or plug into other systems on a one off basis

## /admin
This presents a very simple admin page allowing you to update the destination URL and test it as well.


Built with fly.io
