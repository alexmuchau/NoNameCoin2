import { prisma } from "../../../prisma/prisma";

export async function createValidator(req: any, res: any) {
    const { stackedValue } = req.body
    
    const validator = await prisma.validator.create({
        data: {
            coins_in_stack: stackedValue,
            flag: 0,
        }
    })
    
    res.send(validator)
}