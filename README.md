# Reverse Proxy for YouVersion Event (could be anything though!)

This little site is used to make it super easy to update a subdomain to point to any url, in this case our YouVersion Events links.

This was done to limit admin access within our main site, so non technical people don't break things by mistake ;)

## /
The root url is the proxy url, this is what you share or plug into other systems on a one off basis

## /admin
This presents a very simple admin page allowing you to update the destination URL and test it as well.

## To add a new subdomain that this app can use.

Run this in the root of this app:

```
$ fly hostnames add <subdomain.thec3.uk>
```

Then add the CNAME record to your DNS zone to point to where you are hosting this app (in this case fly.io)

eg. youversion.thec3.uk -> youversion-link.edgeapp.net

*Built with :heart: and fly.io*
