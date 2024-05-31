import { prisma } from "../../../prisma/prisma";
import { v4 as uuid } from 'uuid'

export async function createAddress(req: any, res: any) {    
    const address = 'noName0x' + uuid().replace(/-/g, '')
    
    const new_address = await prisma.address.create({
        data: {
            address: address
        }
    })
    
    res.send(new_address)
}