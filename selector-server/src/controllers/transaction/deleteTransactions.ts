import { prisma } from "../../../prisma/prisma"
import { printFooter, printHeader } from "../../tools/printFunctions"

export async function deleteTransactions(req: any, res: any) {
    const { state } = req.query
    printHeader(`Delete Transactions in state:${state}`)
    
    if (state) {
        const validatorTransactions = await prisma.validatorTransaction.deleteMany({
            where: {
                transaction: {
                    trans_state: state
                }
            }
        })
        
        var deletes = await prisma.transaction.deleteMany({
            where: {
                trans_state: state
            }
        })
    } else {
        const validatorTransactions = await prisma.validatorTransaction.deleteMany()
        var deletes = await prisma.transaction.deleteMany()
    }
    
    res.send(deletes)
    
    printFooter(`Successful deleted ${deletes.count} transactions`)
}