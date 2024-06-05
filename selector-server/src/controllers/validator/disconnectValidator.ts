import { prisma } from "../../../prisma/prisma"

export async function disconnectValidator(req: any, res:any) {
    const { validatorId } = req.query
    
    console.log(validatorId)
    
    if (!validatorId) {
        res.status(500).send({error: "Didn`t provided validatorId"})
        return
    }
    
    const newValidator = await prisma.validator.update({
        where: {
            validator_id: validatorId
        },
        data: {
            host: null,
            validator_state: 'INACTIVE'
        }
    })
    
    res.send(newValidator)
}