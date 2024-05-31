import { prisma } from "../../../prisma/prisma"
import { ReducedValidatorsType, selectValidators } from "../seletor/selectValidators"

async function validateTransaction(transaction: any, validators: ReducedValidatorsType[]) {
    for (const validator of validators) {
        fetch(`http://localhost:${validator.host}/trans`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                transaction: transaction
            })
        })
    }
}

async function createValidatorTransactions(validators: ReducedValidatorsType[], transId:string) {
    const validatorTransactions = await prisma.validatorTransaction.createMany({
        data: validators.map((validator) => (
            {
                trans_id: transId,
                validator_id: validator.validatorId
            }
        ))
    })
    
    return validatorTransactions
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
            trans_state: "NOT_STARTED"
        }
    })
    
    const validators = await selectValidators()
    if (validators.length == 0) {
        res.status(500).send({error: 'Error when creating relations'})
        return
    }
    const validatorTransactions = await createValidatorTransactions(validators, transaction.trans_id)
    
    if (validatorTransactions.count < 3) {
        res.status(500).send({error: 'Error when creating relations'})
        return
    }
    
    validateTransaction(transaction, validators)
    
    res.send({
        message: `Validating transaction! Validators: ${validators}`,
        transaction: transaction
    })
}