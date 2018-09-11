import { mount } from "@fly/fetch/mount"
import { proxy } from "@fly/fetch/proxy"
import { Collection } from "@fly/data"

const storeEventLink = async function(req, init) {
    if (req.method === 'POST') {
        const link = await req.json()
        const eventLinkStore = new Collection('eventLinkStore')
        let res = await eventLinkStore.put('eventLink', link)
        return new Response(`${res}`,{ headers: {"content-type": "application/json"}})
    } else {
        return new Response('Use a POST request for this request')
    } 
}

const redirectToEvent = async function(req, init) {
    const eventLinkStore = new Collection('eventLinkStore')
    const eventLink = await eventLinkStore.get('eventLink')
    console.log(`${eventLink.link}`) 
    //return await proxy(req, `${eventLink.link}`) 
    //return await fetch(eventLink.link)
    return new Response('Redirecting', {
        headers: {
            'Location': eventLink.link
        },
        status: 303
    })
}

const mounts = mount({
    '/store': storeEventLink,
    '/': redirectToEvent
})

fly.http.respondWith(mounts)
