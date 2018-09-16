import { mount } from "@fly/fetch/mount"
import { proxy } from "@fly/fetch/proxy"
import { Collection } from "@fly/data"


async function getTemplate() {
    const resp = await fetch("file://index.html")
    return await resp.text()
}

async function getHost(req) {
    const url = new URL(req.url)
    return await `${url.protocol}\/\/${url.host}`
}

const storeEventLink = async function(req, init) {
    const host = await getHost(req)
    const template = await getTemplate()
    const doc = Document.parse(template)
    const label = doc.getElementById('host-label')
    label.replaceWith(host)
    const link = doc.getElementById('host-link')
    link.setAttribute('href', host)
    const html = doc.documentElement.outerHTML
    if (req.method === 'POST') {
        const data = await req.formData()
        const eventLinkStore = new Collection('eventLinkStore')
        let res = await eventLinkStore.put(host, data.get('link'))
        return new Response(`${res}`,{ 
            headers: {
                "Location": req.url
            },
            status: 303
        })
    } else {
        return new Response(html, { headers: {"Content-Type": "text/html"}})
    } 
}

const redirectToEvent = async function(req, init) {
    const host = await getHost(req)
    const eventLinkStore = new Collection('eventLinkStore')
    const eventLink = await eventLinkStore.get(host)
    console.log(`Redirect link for ${host}: ${eventLink}`) 
    if (eventLink === undefined) {
        return new Response('Not Found', {status: 404})
    }
    return new Response('Redirecting', {
        headers: {
            'Location': eventLink
        },
        status: 303
    })
}

const getFavicon = async function(req, init) {
    return await fetch("file://favicon.ico")
}

const mounts = mount({
    '/favicon.ico': getFavicon,
    '/store': storeEventLink,
    '/admin': storeEventLink,
    '/': redirectToEvent
})

fly.http.respondWith(mounts)
