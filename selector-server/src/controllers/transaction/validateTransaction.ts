import { prisma } from "../../../prisma/prisma"

export async function validateTransaction(req:any, res:any) {
    const { trans_id, validator_id, validation } = req.body
    
    const transaction = await prisma.transaction.findFirst({
        where: {
            trans_id: trans_id
        }
    })
    
    if (!transaction || transaction.trans_state != 'VALIDATING') {
        res.status(500).send({ok: false})
        return
    }
    
    await prisma.validatorTransaction.update({
        where: {
            trans_id_validator_id: {
                trans_id: trans_id,
                validator_id: validator_id
            }
        },
        data: {
            validation: validation
        }
    })
    
    const transValidatorTransactions = await prisma.validatorTransaction.findMany({
        where: {
            trans_id: trans_id
        }
    })
    
    let approved = 0
    for (const validatorTransaction of transValidatorTransactions) {
        if (validatorTransaction.validation == "IN_PROGRESS") {
            res.send({ok: true})
            
            return
        } 
        else if (validatorTransaction.validation == 'APPROVED') {
            approved += 1
        }
    }
    
    const transState = (approved/transValidatorTransactions.length)*100 > 50 ? 'APPROVED' : 'DENIED'
    const validatorTax = (transaction.trans_tax * 0.66)/transValidatorTransactions.length
    finishTransaction(trans_id, transState, validatorTax)
}

export async function finishTransaction(transId:any, transState:any, validatorTax:any) {
    await prisma.transaction.update({
        where: {
            trans_id: transId
        },
        data: {
            trans_state: transState,
            validators_transaction: {
                updateMany: {
                    where: {
                        trans_id: transId
                    },
                    data: {
                        validator_tax: validatorTax
                    }
                }
            }
        }
    })
}