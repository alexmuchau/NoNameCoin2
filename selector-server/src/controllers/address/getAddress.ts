import { prisma } from "../../../prisma/prisma";

export async function getAddress(req: any, res: any) {
    const addresses = await prisma.address.findMany()
    
    res.send(addresses)
}