import { prisma } from "../../../prisma/prisma";

export async function createValidator(req: any, res: any) {
    const { address } = req.body
    
    const validator = await prisma.validator.create({
        data: {
            validator_address: address,
            host: '1111',
            flag: 'Teste',
            validator_state: 'Free'
        }
    })
    
    res.send(validator)
}