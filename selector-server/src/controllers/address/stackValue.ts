import { prisma } from "../../../prisma/prisma";

export async function stackValue(req: any, res: any) {
    const { address, value } = req.body
    console.log(address)
    console.log(value)
    console.log(req.body)
    console.log('                      ')
    
    const updatedAddress = await prisma.address.update({
        where: {
            address: address
        },
        data: {
            coins_in_stack: value
        }
    })
    
    res.send(updatedAddress)
}