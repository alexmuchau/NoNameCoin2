import { prisma } from "../../../prisma/prisma"

export async function getTransactions(req: any, res: any) {
    const queryParams = req.query
    let filters:any = {
        maxTransactions: 100
    }
    
    for (const key in queryParams) {
        filters[key] = queryParams[key]
    }
    
    const transactions = await prisma.transaction.findMany({
        include: {
            validators_transaction: {},
            sender: {
                select: {
                    address: true
                }
            },
            receiver: {
                select: {
                    address: true
                }
            },
            _count: true
        },
        take: filters.maxTransactions
    })
    
    res.send(transactions)
}