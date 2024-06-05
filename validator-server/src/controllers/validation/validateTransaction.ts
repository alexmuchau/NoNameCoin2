import { MY_TIME } from "../../app"

export async function validateTransaction(req: any, res: any) {
    const {
        sender,
        receiver,
        trans_coins,
        trans_tax,
        trans_timestamp,
        trans_state
    } = req.body
    
    if (trans_coins + trans_tax > sender.coins_in_stock) {
        
    }
    
    if (trans_timestamp < MY_TIME) {
        
    }
    
    res.send({ok: 'Validating'})
}

export async function validateTransactionLight(req: any, res: any) {
    res.send({ok: 'Validating'})
}