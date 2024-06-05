import { prisma } from "../../../prisma/prisma";

export async function stackValue(req: any, res: any) {
    const { validator_id, value } = req.body
    
    const validator_coins_in_stack = await prisma.validator.findFirst({
        where: {
            validator_id: validator_id
        },
        select: {
            coins_in_stack: true
        }
    })
    
    if (!validator_coins_in_stack) {
        res.status(500).send({error: 'Error when searching validator'})
        return
    }
    
    const updatedAddress = await prisma.validator.update({
        where: {
            validator_id: validator_id
        },
        data: {
            coins_in_stack: validator_coins_in_stack.coins_in_stack + value
        }
    })
    
    res.send(updatedAddress)
}