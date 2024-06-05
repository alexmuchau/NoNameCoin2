export async function validateMe(address:string, port:string) {
    const res = await fetch('http://localhost:4100/validador/check', {
        method: 'POST',
        headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
        body: JSON.stringify({
            validator_id: address,
            port: port
        })
    })
    
    return res.status == 200
}