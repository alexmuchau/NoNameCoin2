async function awaitTimeout(ms: number) {
    setTimeout(() => {
        return
    }, ms)
}

export async function validateTransaction(req: any, res: any) {
    let count = 0
    while (1==1) {
        count += 1
        console.log(count)
        if (count > 10000000000000) {
            break
        }
    }
    res.send({ok: 'Validating'})
}

export async function validateTransactionLight(req: any, res: any) {
    res.send({ok: 'Validating'})
}