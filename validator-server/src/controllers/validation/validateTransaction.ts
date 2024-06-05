import { MY_TIME, VALIDATOR_ID } from "../../app"

export async function sendValidation(trans_id:string, validator_id:string, validation:'APPROVED' | 'DENIED') {
    await fetch('http://localhost:4100/trans/validation', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            trans_id: trans_id, 
            validator_id: validator_id, 
            validation: validation
        })
    })
}

export async function validateTransaction(req: any, res: any) {
    const {
        trans_id,
        sender,
        receiver,
        trans_coins,
        trans_tax,
        trans_timestamp,
        trans_state
    } = req.body
    
    if (trans_coins + trans_tax > sender.coins_in_stock) {
        await sendValidation(trans_id, VALIDATOR_ID, "DENIED")
        return
    }
    
    if (trans_timestamp < MY_TIME) {
        await sendValidation(trans_id, VALIDATOR_ID, "DENIED")
        return
    }
    
    res.send({ok: 'Validating'})
}