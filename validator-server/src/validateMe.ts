export async function validateMe(host:string) {
    const res = await fetch('http://selector_server:4100/validador/check', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            host: host
        })
    })
    
    return res.status == 200
}