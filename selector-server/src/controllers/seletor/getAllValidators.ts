import { prisma } from "../../../prisma/prisma";

export async function getAllValidators(req: any, res: any) {
    const validators = await prisma.validator.findMany({
    })
    
    res.send(validators)
}