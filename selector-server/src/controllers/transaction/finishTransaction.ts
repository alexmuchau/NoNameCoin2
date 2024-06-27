import { prisma } from "../../../prisma/prisma"

export async function finishTransaction(transaction:any, validations: { APPROVED: string[], DENIED: string[] }) {
    
    const mostValidation = validations.APPROVED.length > validations.DENIED.length ? "APPROVED" : "DENIED"
    const minValidation = mostValidation == "APPROVED" ? "DENIED" : "APPROVED"
    
    const qtyValidators = validations[mostValidation].length
    const validatorTax = (transaction.trans_tax * 0.66)/qtyValidators
    
    // UPDATING TRANSACTION STATE
    await prisma.transaction.update({
        where: {
            trans_id: transaction.trans_id
        },
        data: {
            trans_state: mostValidation,
        }
    })
    
    // ADJUSTING FLAGS
    await prisma.validator.updateMany({
        where: {
            validator_id: {
                in: validations[minValidation]
            }
        },
        data: {
            flag: {
                increment: 1
            }
        }
    })
    
    if (mostValidation == 'APPROVED') {
        await prisma.address.update({
            where: {
                address: transaction.receiver_address
            },
            data: {
                coins_in_stock: {
                    increment: transaction.trans_coins
                }
            }
        })
        
        await prisma.address.update({
            where: {
                address: transaction.sender_address
            },
            data: {
                coins_in_stock: {
                    decrement: transaction.trans_coins + transaction.trans_tax
                }
            }
        })
        
        await prisma.validatorTransaction.updateMany({
            where: {
                trans_id: transaction.trans_id,
                AND: {
                    validator_id: {
                        in: validations.APPROVED
                    }
                }
            },
            data: {
                validator_tax: validatorTax,   
            }
        })
    }
}