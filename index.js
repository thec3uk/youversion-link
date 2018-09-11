import { mount } from "@fly/fetch/mount"
import { proxy } from "@fly/fetch/proxy"
import { Collection } from "@fly/data"

const storeEventLink = function(req, init) {
    if (req.method === 'POST') {
        const link = req.json()
        console.log(await link)
        const eventLinkStore = new Collection('eventLinkStore')
        const res = eventLinkStore.put('eventLink', link)
        console.log(res)
        return new Response('Done',{ headers: {"content-type": "application/json"}})
    } else {
        return new Response('Use a POST request for this request')
    } 
}

const redirectToEvent = function(req, init) {
    const eventLinkStore = new Collection('eventLinkStore')
    const eventLink = eventLinkStore.get('eventLink')
    console.log(eventLink)
    return proxy(req, 'https://www.google.com')
}

const mounts = mount({
    '/store': storeEventLink,
    '/': redirectToEvent
})

fly.http.respondWith(mounts)
