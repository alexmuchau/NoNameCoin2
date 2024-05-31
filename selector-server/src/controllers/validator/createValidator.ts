import { prisma } from "../../../prisma/prisma";

export async function createValidator(req: any, res: any) {
    const { address } = req.body
    
    const validator = await prisma.validator.create({
        data: {
            validator_address: address,
            flag: 0,
        }
    })
    
    res.send(validator)
}