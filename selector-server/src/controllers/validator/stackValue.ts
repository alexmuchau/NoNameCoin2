import { prisma } from "../../../prisma/prisma";

export async function stackValue(req: any, res: any) {
    const { validator_id, value } = req.body
    
    const updatedAddress = await prisma.validator.update({
        where: {
            validator_id: validator_id
        },
        data: {
            coins_in_stack: value
        }
    })
    
    res.send(updatedAddress)
}