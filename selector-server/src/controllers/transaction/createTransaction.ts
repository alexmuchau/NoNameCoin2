import { prisma } from "../../../prisma/prisma"
import { selectValidators } from "../seletor/selectValidators"

async function validateTransaction(transaction: any) {
    /// to-do
}

export async function createTransaction(req: any, res: any) {
    const { sender_address, receiver_address, trans_coins, trans_timestamp } = req.body
    
    const trans_tax = trans_coins * 1.5
    
    const transaction = await prisma.transaction.create({
        data: {
            sender_address: sender_address,
            receiver_address: receiver_address,
            trans_coins: trans_coins,
            trans_tax: trans_tax,
            trans_timestamp: trans_timestamp,
            trans_state: 'Not started'
        }
    })
    
    selectValidators()
    
    const validate = validateTransaction(req)
}