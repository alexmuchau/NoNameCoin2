import { prisma } from "../../../prisma/prisma"

export async function addValue(req:any, res:any) {
    const { address, value } = req.body
    
    const newAddress = await prisma.address.update({
        where: {
            address: address
        },
        data: {
            coins_in_stock: value
        }
    })
    
    res.send(newAddress)
}