import { prisma } from "../../../prisma/prisma";
import { finishTransaction } from "./finishTransaction";

export async function validateTransaction(req: any, res: any) {
    const { transId, validatorId, validation } = req.body
    let validations: { APPROVED: string[]; DENIED: string[]; FAILED: string[] } = {
        APPROVED: [],
        DENIED: [],
        FAILED: []
    };
    
    const transaction = await prisma.transaction.findFirst({
        where: {
            trans_id: transId
        }
    })
    
    if (!transaction || transaction.trans_state != "VALIDATING") {
        return
    }
    
    await prisma.validatorTransaction.update({
          where: {
            trans_id_validator_id: {
              trans_id: transId,
              validator_id: validatorId,
            },
          },
          data: {
            validation: validation,
          },
        });
        
    const validatorTransactions = await prisma.validatorTransaction.findMany({
        where: {
            trans_id: transId
        },
    })
    
    for (const validation of validatorTransactions) {
        if (!validation.validation || validation.validation == "IN_PROGRESS") return
        
        validations[validation.validation].push(validation.validator_id)
    }
    
    finishTransaction(transaction, validations)
}