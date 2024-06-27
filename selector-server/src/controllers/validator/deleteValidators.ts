import { prisma } from "../../../prisma/prisma"
import { printFooter, printHeader } from "../../tools/printFunctions"

export async function deleteValidators(req: any, res: any) {
    const { state } = req.query
    printHeader(`Delete Validators in state:${state}`)
    
    if (state) {
        const validators = await prisma.validator.findMany({
            where: {
                validator_state: state
            },
            select: {
                validator_id: true,
                validator_transactions: {
                    select: {
                        trans_id: true
                    }
                }
            }
        })
        
        if (!validators) {
            res.send({ok: false})
            return
        }
        
        let trans_ids: Set<string> = new Set()
        validators.forEach((validator) => {
            validator.validator_transactions.forEach((validatorTransaction) => {
                trans_ids.add(validatorTransaction.trans_id)
            })
        })
        
        const validatorsTransactions = await prisma.validatorTransaction.deleteMany({
            where: {
                trans_id: {
                    in: Array.from(trans_ids)
                }
            },
        })
        
        
        const transactions = await prisma.transaction.deleteMany({
            where: {
                trans_id: {
                    in: Array.from(trans_ids)
                }
            },
        })
        
        var deletes = await prisma.validator.deleteMany({
            where: {
                validator_state: state
            }
        })
    } else {
        const validatorTransactions = await prisma.validatorTransaction.deleteMany()
        var deletes = await prisma.validator.deleteMany({})
    }
    
    res.send(deletes)
    
    printFooter(`Successful deleted ${deletes.count} validators`)
}