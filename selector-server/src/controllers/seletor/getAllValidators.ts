import { prisma } from "../../../prisma/prisma";

export async function getAllValidators(req: any, res: any) {
    const validators = await prisma.validator.findMany({
        include: {
            address: {
                select: {
                    address: true,
                    coins_in_stack: true
                }
            }
        }
    })
    
    res.send(validators)
}