const getShopifyProducts = async () => {
    const pipeDreamUrl = "https://eort2w0c3vh0zdu.m.pipedream.net"

    try {
        let response = await fetch(pipeDreamUrl)

        response = await response.json()

        return response        
    } catch (e) {
        return e
    }
}

const sendOrder = async (order) => {
    const pipeDreamUrl = "https://eoqcbe4tu4jp22.m.pipedream.net"

    let response = await fetch(pipeDreamUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
    })

    return response
}

export {
    getShopifyProducts,
    sendOrder
}